from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from apps.photos.models import Photo
from apps.photos.serializers import PhotoSerializer


class PhotoModelTest(TestCase):
    def test_create_photo(self):
        photo = Photo.objects.create(
            title="Башня",
            year=2025,
            description="Описание фото"
        )

        self.assertEqual(photo.title, "Башня")
        self.assertEqual(photo.year, 2025)
        self.assertTrue(photo.is_published)

class PhotoStrTest(TestCase):

    def test_photo_str(self):
         photo = Photo.objects.create(
             title="Море"
         )

         self.assertEqual(str(photo), "Море")



class PhotoApiTest(APITestCase):
     def test_get_photos(self):
        Photo.objects.create(
              title="Фото 1"
        )

        response = self.client.get("/api/photos/")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertEqual(len(response.data), 1)

class PublishedPhotoTest(APITestCase):
    def test_only_published_photos(self):
        Photo.objects.create(
            title="Видимое фото",
            is_published=True
        )

        Photo.objects.create(
            title="Скрытое фото",
            is_published=False
        )

        response = self.client.get("/api/photos/")

        self.assertEqual(len(response.data), 1)
        self.assertEqual(
            response.data[0]["title"],
            "Видимое фото"
        )




class PhotoSerializerTest(TestCase):
    def test_serializer_fields(self):

        photo = Photo.objects.create(
            title="Скульптура",
            year=2024
        )

        data = PhotoSerializer(photo).data

        self.assertEqual(data["title"], "Скульптура")
        self.assertEqual(data["year"], 2024)
        self.assertIn("image_url", data)