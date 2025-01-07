import logging
from logging.handlers import RotatingFileHandler

# Configure logger
logger = logging.getLogger("app_logger")
logger.setLevel(logging.INFO)

# Rotating log handler
handler = RotatingFileHandler("app.log", maxBytes=5*1024*1024, backupCount=3)  # 5 MB
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)

logger.addHandler(handler)
