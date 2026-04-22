from django.urls import path, include
from .views import get_cart, add_to_cart, remove_from_cart, create_order,get_products


urlpatterns = [
    path("cart/", get_cart),
    path("cart/add/", add_to_cart),
    path("cart/remove/", remove_from_cart),
    path("orders/create/", create_order),
    path("products/", get_products),

]