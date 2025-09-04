from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import connect_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root():
    return {"message": "Hello World"}
