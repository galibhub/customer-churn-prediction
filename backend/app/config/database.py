import os

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "customer_churn_db")

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI is missing from the .env file.")

client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000
)

db = client[DATABASE_NAME]

users_collection = db["users"]
predictions_collection = db["predictions"]
sessions_collection = db["sessions"]


def check_database_connection() -> bool:
    try:
        client.admin.command("ping")
        return True
    except Exception:
        return False


# Indexes
users_collection.create_index("email", unique=True)

predictions_collection.create_index(
    [
        ("user_id", 1),
        ("created_at", -1)
    ]
)

sessions_collection.create_index(
    "token_hash",
    unique=True
)