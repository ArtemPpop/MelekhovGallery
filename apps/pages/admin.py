from django.contrib import admin
from .models import (HomePage,News,SiteSettings,
BiographyPage,BiographySection, BiographyTimeline,Award,ArchivePhoto,
CreativityPage,CreativitySection,CreativityTechnique, CreativityTheme,
ContactsPage,ContactTopic,
)

@admin.register(HomePage)
class HomePageAdmin(admin.ModelAdmin):
    list_display = ("museum_title", "updated_at")

    def has_add_permission(self, request):
        return not HomePage.objects.exists()

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "published_at",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }

    search_fields = (
        "title",
        "short_description",
    )

    list_filter = (
        "published_at",
    )

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()


class BiographySectionInline(admin.TabularInline):
    model = BiographySection
    extra = 0
class BiographyTimelineInline(admin.TabularInline):
    model = BiographyTimeline
    extra = 0
class AwardInline(admin.TabularInline):
    model = Award
    extra = 0
class ArchivePhotoInline(admin.TabularInline):
    model = ArchivePhoto
    extra = 0

@admin.register(BiographyPage)
class BiographyPageAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "artist_name",
        "updated_at",
    )

    inlines = [
        BiographySectionInline,
        BiographyTimelineInline,
        AwardInline,
        ArchivePhotoInline,
    ]

    def has_add_permission(self, request):
        return not BiographyPage.objects.exists()

class CreativitySectionInline(admin.TabularInline):
    model = CreativitySection
    extra = 0
class CreativityTechniqueInline(admin.TabularInline):
    model = CreativityTechnique
    extra = 0
class CreativityThemeInline(admin.TabularInline):
    model = CreativityTheme
    extra = 0

@admin.register(CreativityPage)
class CreativityPageAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "updated_at",
    )

    inlines = [
        CreativitySectionInline,
        CreativityTechniqueInline,
        CreativityThemeInline,
    ]

    def has_add_permission(self, request):
        return not CreativityPage.objects.exists()

class ContactTopicInline(admin.TabularInline):
    model = ContactTopic
    extra = 0

@admin.register(ContactsPage)
class ContactsPageAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "updated_at",
    )

    inlines = [
        ContactTopicInline,
    ]

    def has_add_permission(self, request):
        return not ContactsPage.objects.exists()