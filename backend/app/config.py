import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    env: str = os.getenv("BACKEND_ENV", "development")
    host: str = os.getenv("BACKEND_HOST", "localhost")
    port: int = os.getenv("BACKEND_PORT", 8000)
    url: str = os.getenv("BACKEND_URL", "http://localhost:8000")

    db_name: str
    db_url: str

    origin_urls: list[str] = os.getenv("ORIGIN_URLS", "http://localhost:5173").split(",")

    @property
    def is_development(self) -> bool:
        return self.env == "development"

    @property
    def is_production(self) -> bool:
        return self.env == "production"

    @property
    def is_test(self) -> bool:
        return self.env == "test"


settings = Settings()
