import django_filters
from .models import Artwork


class ArtworkFilter(django_filters.FilterSet):

    year = django_filters.NumberFilter()
    genre = django_filters.CharFilter()
    technique = django_filters.CharFilter()

    year_min = django_filters.NumberFilter(field_name="year", lookup_expr="gte")
    year_max = django_filters.NumberFilter(field_name="year", lookup_expr="lte")

    class Meta:
        model = Artwork
        fields = [
            "genre",
            "technique",
            "year"
        ]
