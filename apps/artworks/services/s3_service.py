import boto3
from django.conf import settings



def get_s3_images():
    s3 = boto3.client(
        "s3",
        endpoint_url=settings.AWS_S3_ENDPOINT_URL,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
    )
    response = s3.list_objects_v2(
        Bucket=settings.AWS_STORAGE_BUCKET_NAME,
        Prefix="images/"
    )

    files = []
    for obj in response.get("Contents", []):
        key = obj["Key"]
        if key.lower().endswith((".jpg", ".png", ".jpeg", ".webp")):
            filename = key.split("/")[-1]
            files.append((
                f"{settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_STORAGE_BUCKET_NAME}/{key}",
                filename
            ))
    return files
