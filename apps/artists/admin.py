from django.contrib import admin
from .models import Artist, Award


class AwardInline(admin.TabularInline):
    model = Award
    extra = 1


@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'birth_date', 'death_date')
    search_fields = ('full_name',)
    inlines = [AwardInline]
