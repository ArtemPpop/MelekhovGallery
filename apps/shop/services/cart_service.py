from ..models import Cart, CartItem
from django.db import transaction

def get_or_create_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(
            user=request.user,
            defaults={"session_id": None}
        )
        return cart

    if not request.session.session_key:
        request.session.create()

    session_id = request.session.session_key

    cart, _ = Cart.objects.get_or_create(
        session_id=session_id
    )

    return cart


def add_item(cart, variant, quantity):
    with transaction.atomic():
        item, created = CartItem.objects.select_for_update().get_or_create(
            cart=cart,
            product_variant=variant
        )
        if variant.stock < item.quantity:
            raise ValueError("Not enough stock")

        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity

        item.save()