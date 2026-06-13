from rest_framework import serializers

from .models import (HomePage,News,SiteSettings,BiographyPage,BiographySection,BiographyTimeline,Award,
                     ArchivePhoto,CreativityPage, CreativitySection, CreativityTechnique, CreativityTheme,
                     ContactsPage,ContactTopic,
)

class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = "__all__"
class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = "__all__"
class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = "__all__"


class BiographySectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiographySection
        fields = "__all__"
class BiographyTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiographyTimeline
        fields = "__all__"
class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = "__all__"
class ArchivePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArchivePhoto
        fields = "__all__"

class BiographyPageSerializer(serializers.ModelSerializer):

    sections = BiographySectionSerializer(
        many=True,
        read_only=True
    )

    timeline = BiographyTimelineSerializer(
        many=True,
        read_only=True
    )

    awards = AwardSerializer(
        many=True,
        read_only=True
    )

    archive_photos = ArchivePhotoSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = BiographyPage

        fields = (
            "id",
            "title",
            "artist_name",
            "intro_text",

            "sections",
            "timeline",
            "awards",
            "archive_photos",
        )

class CreativitySectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreativitySection
        fields = "__all__"
class CreativityTechniqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreativityTechnique
        fields = "__all__"
class CreativityThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreativityTheme
        fields = "__all__"

class CreativityPageSerializer(serializers.ModelSerializer):

    sections = CreativitySectionSerializer(
        many=True,
        read_only=True
    )

    techniques = CreativityTechniqueSerializer(
        many=True,
        read_only=True
    )

    themes = CreativityThemeSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = CreativityPage

        fields = "__all__"

class ContactTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactTopic
        fields = "__all__"

class ContactsPageSerializer(serializers.ModelSerializer):

    topics = ContactTopicSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = ContactsPage

        fields = "__all__"