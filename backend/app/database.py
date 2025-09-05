from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.config import settings
from app.notes.models import Note


async def connect_db():
    client = AsyncIOMotorClient(settings.db_url)
    await init_beanie(database=client[settings.db_name], document_models=[Note])
