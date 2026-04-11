import boto3
from django.conf import settings


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
            Prefix="previews/"

        )

        files = []

        for obj in response.get("Contents", []):
            key = obj["Key"]

            # Пропускаем саму папку
            if key == "previews/":
                continue

            # Проверяем расширение
            if key.lower().endswith((".jpg", ".png", ".jpeg", ".webp", ".gif")):
                url = f"{settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_STORAGE_BUCKET_NAME}/{key}"
                files.append((url, key.split('/')[-1]))

        return files


    except Exception as e:

        print(f"Error fetching S3 images: {e}")

        return []
