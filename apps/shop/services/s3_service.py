import boto3
import logging
from django.conf import settings
logger = logging.getLogger(__name__)


def get_s3_images(folder_name="previews/"):
    try:
        s3 = boto3.client(
            "s3",
            endpoint_url=settings.AWS_S3_ENDPOINT_URL,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )
        response = s3.list_objects_v2(
            Bucket=settings.AWS_STORAGE_BUCKET_NAME,
            Prefix=folder_name
        )
        files = []
        for obj in response.get("Contents", []):
            key = obj["Key"]

            if key == folder_name:
                continue
            if key.lower().endswith((".jpg", ".png", ".jpeg", ".webp", ".gif")):
                files.append((key, key.split('/')[-1]))
        return files
    except Exception as e:
        logger.error(f"S3 error: {e}")
        return []