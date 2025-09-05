import asyncio

from google import genai

from app.config import gen_settings


class GeminiClient:
    def __init__(self):
        if not gen_settings.gemini_api_key:
            raise ValueError("Cannot initialize Gemini Service")

        self.client = genai.Client(api_key=gen_settings.gemini_api_key)
        self.model = gen_settings.gemini_model_name

    async def generate_text(self, prompt: str) -> str:
        try:
            response = await asyncio.to_thread(
                self.client.models.generate_content, model=self.model, contents=prompt
            )
            return response.text
        except Exception as e:
            raise Exception("Something went wrong") from e
