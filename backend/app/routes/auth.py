from datetime import datetime, timezone
import hashlib
import secrets

from fastapi import (
    APIRouter,
    Depends,
    Header,
    HTTPException,
    status
)

from app.config.database import (
    sessions_collection,
    users_collection
)

from app.models.customer import (
    create_user_document
)

from app.schemas.customer_schema import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


def hash_password(
    password: str
) -> tuple[str, str]:

    salt = secrets.token_bytes(16)

    password_hash = hashlib.scrypt(
        password.encode("utf-8"),
        salt=salt,
        n=2**14,
        r=8,
        p=1
    )

    return (
        salt.hex(),
        password_hash.hex()
    )


def verify_password(
    password: str,
    salt_hex: str,
    stored_hash_hex: str
) -> bool:

    salt = bytes.fromhex(salt_hex)

    password_hash = hashlib.scrypt(
        password.encode("utf-8"),
        salt=salt,
        n=2**14,
        r=8,
        p=1
    )

    return secrets.compare_digest(
        password_hash.hex(),
        stored_hash_hex
    )


def create_session(user_id) -> str:

    token = secrets.token_urlsafe(32)

    token_hash = hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()

    sessions_collection.insert_one({

        "token_hash": token_hash,

        "user_id": user_id,

        "created_at":
            datetime.now(timezone.utc)
    })

    return token


def get_current_user(
    authorization: str | None = Header(
        default=None
    )
):

    if (
        not authorization
        or not authorization.startswith("Bearer ")
    ):

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required."
        )

    token = authorization.replace(
        "Bearer ",
        "",
        1
    ).strip()

    token_hash = hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()

    session = sessions_collection.find_one({
        "token_hash": token_hash
    })

    if not session:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token."
        )

    user = users_collection.find_one({
        "_id": session["user_id"]
    })

    if not user:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found."
        )

    return user


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register(
    data: RegisterRequest
):

    email = data.email.strip().lower()

    if "@" not in email:

        raise HTTPException(
            status_code=400,
            detail="Please provide a valid email address."
        )

    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:

        raise HTTPException(
            status_code=409,
            detail="Email is already registered."
        )

    salt, password_hash = hash_password(
        data.password
    )

    document = create_user_document(
        name=data.name.strip(),
        email=email,
        password_salt=salt,
        password_hash=password_hash
    )

    result = users_collection.insert_one(
        document
    )

    return {
        "id": str(result.inserted_id),
        "name": document["name"],
        "email": document["email"]
    }


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    data: LoginRequest
):

    email = data.email.strip().lower()

    user = users_collection.find_one({
        "email": email
    })

    if (
        not user
        or not verify_password(
            data.password,
            user["password_salt"],
            user["password_hash"]
        )
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    token = create_session(
        user["_id"]
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


@router.post("/logout")
def logout(
    authorization: str | None = Header(
        default=None
    )
):

    if (
        not authorization
        or not authorization.startswith("Bearer ")
    ):

        raise HTTPException(
            status_code=401,
            detail="Authentication required."
        )

    token = authorization.replace(
        "Bearer ",
        "",
        1
    ).strip()

    token_hash = hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()

    sessions_collection.delete_one({
        "token_hash": token_hash
    })

    return {
        "message": "Logged out successfully."
    }