from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    role: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class SuccessResponse(BaseModel):
    success: bool
    message: str
