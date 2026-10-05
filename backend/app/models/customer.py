from datetime import datetime, timezone


def create_user_document(
    name: str,
    email: str,
    password_salt: str,
    password_hash: str
) -> dict:

    return {
        "name": name,
        "email": email,
        "password_salt": password_salt,
        "password_hash": password_hash,
        "created_at": datetime.now(timezone.utc)
    }