import hashlib
import secrets
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.config.database import sessions_collection, users_collection
from app.models.customer import create_user_document
from app.schemas.customer_schema import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

security = HTTPBearer()


# -----------------------------
# Password Hashing
# -----------------------------

def hash_password(password: str, salt: bytes) -> str:
    password_hash = hashlib.scrypt(
        password.encode("utf-8"),
        salt=salt,
        n=2**14,
        r=8,
        p=1,
        dklen=64,
    )

    return password_hash.hex()


def verify_password(
    password: str,
    salt_hex: str,
    stored_hash: str
) -> bool:
    salt = bytes.fromhex(salt_hex)

    password_hash = hash_password(password, salt)

    return secrets.compare_digest(
        password_hash,
        stored_hash
    )


# -----------------------------
# Token Hashing
# -----------------------------

def hash_token(token: str) -> str:
    return hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()


# -----------------------------
# Register
# -----------------------------

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register(data: RegisterRequest):

    email = data.email.strip().lower()

    existing_user = users_collection.find_one(
        {"email": email}
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )

    salt = secrets.token_bytes(16)

    password_hash = hash_password(
        data.password,
        salt
    )

    user_document = create_user_document(
        name=data.name.strip(),
        email=email,
        password_salt=salt.hex(),
        password_hash=password_hash
    )

    result = users_collection.insert_one(
        user_document
    )

    return {
        "id": str(result.inserted_id),
        "name": user_document["name"],
        "email": user_document["email"]
    }


# -----------------------------
# Login
# -----------------------------

@router.post(
    "/login",
    response_model=TokenResponse
)
def login(data: LoginRequest):

    email = data.email.strip().lower()

    user = users_collection.find_one(
        {"email": email}
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    password_valid = verify_password(
        data.password,
        user["password_salt"],
        user["password_hash"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    token = secrets.token_urlsafe(32)

    session_document = {
        "token_hash": hash_token(token),
        "user_id": str(user["_id"]),
        "created_at": datetime.now(timezone.utc)
    }

    sessions_collection.insert_one(
        session_document
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        }
    }


# -----------------------------
# Current User
# -----------------------------

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    token_hash = hash_token(token)

    session = sessions_collection.find_one(
        {"token_hash": token_hash}
    )

    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required."
        )

    user = users_collection.find_one(
        {"_id": __import__("bson").ObjectId(session["user_id"])}
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found."
        )

    return user


# -----------------------------
# Logout
# -----------------------------

@router.post("/logout")
def logout(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    result = sessions_collection.delete_one(
        {
            "token_hash": hash_token(token)
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session."
        )

    return {
        "message": "Logged out successfully."
    }