import os
from starlette.config import Config
from starlette.datastructures import Secret

# Resolve absolute path to .env file within the same 'src' folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_FILE = os.path.join(BASE_DIR, ".env")

config = Config(ENV_FILE)

class Settings:
    APP_NAME: str = config("APP_NAME", cast=str, default="The Estate")
    DEBUG: bool = config("DEBUG", cast=bool, default=False)
    DATABASE_URL: str = config("DATABASE_URL", cast=str, default="sqlite+aiosqlite:///./app.db")
    SECRET_KEY: str = config("SECRET_KEY", cast=str, default="ajfhlakjdfhslkashjflkajhdsf")
    ALGORITHM: str = config("ALGORITHM", cast=str, default="HS256")
    ACCESS_TOKEN_EXPIRATION_DAYS: int = config("ACCESS_TOKEN_EXPIRATION_DAYS", cast=int, default=1)
    CLIENT_URL: str = config("CLIENT_URL", cast=str, default="http://localhost:5173")


settings = Settings()
