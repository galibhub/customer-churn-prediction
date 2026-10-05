from pydantic import BaseModel, Field


class RegisterRequest(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100
    )

    email: str = Field(
        min_length=5,
        max_length=150
    )

    password: str = Field(
        min_length=6,
        max_length=100
    )


class LoginRequest(BaseModel):
    email: str = Field(
        min_length=5,
        max_length=150
    )

    password: str = Field(
        min_length=6,
        max_length=100
    )


class UserResponse(BaseModel):
    id: str
    name: str
    email: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse