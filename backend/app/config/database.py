import os

from dotenv import load_dotenv
from pymongo import MongoClient


# Load environment variables
load_dotenv()


# MongoDB settings
MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv(
    "DATABASE_NAME",
    "customer_churn_db"
)


# Check MongoDB URI
if not MONGODB_URI:
    raise RuntimeError(
        "MONGODB_URI is missing from the .env file."
    )


# Create MongoDB client
client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000
)


# Select database
db = client[DATABASE_NAME]


# Collections
users_collection = db["users"]
predictions_collection = db["predictions"]
sessions_collection = db["sessions"]


# Database connection check
def check_database_connection() -> bool:
    try:
        client.admin.command("ping")
        return True
    except Exception:
        return False


# Create indexes
users_collection.create_index(
    "email",
    unique=True
)

sessions_collection.create_index(
    "token_hash",
    unique=True
)

predictions_collection.create_index(
    [
        ("user_id", 1),
        ("created_at", -1)
    ]
)