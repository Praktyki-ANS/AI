from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from log_config import logger

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info(f"Request: {request.method} {request.url}")
        logger.info(f"Headers: {request.headers}")
        logger.info(f"Client: {request.client}")
        
        try:
            response = await call_next(request)
            logger.info(f"Response status: {response.status_code}")
            return response
        except Exception as e:
            logger.error(f"Exception occurred: {str(e)}", exc_info=True)
            raise
