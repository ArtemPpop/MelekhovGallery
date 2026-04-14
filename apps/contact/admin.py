from django.contrib import admin
from .models import Contact


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):

    list_display = ("name", "email", "is_processed", "created_at","message")
    list_filter = ("is_processed", "created_at")
    search_fields = ("name", "email", "message")

    list_editable = ("is_processed",)
    readonly_fields = ("created_at",)

    ordering = ("-created_at",)