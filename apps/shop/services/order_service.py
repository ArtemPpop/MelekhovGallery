from django.db import transaction
from ..models import Order, OrderItem, ProductVariant


def create_order_from_cart(cart, user, email, phone, address):
    items = cart.cartitem_set.all()

    total_price = 0

    with transaction.atomic():
        order = Order.objects.create(
            user=user,
            email=email,
            phone=phone,
            address=address,
            total_price=0
        )

        for item in items:
            variant = item.product_variant

            if variant.stock < item.quantity:
                raise Exception("Not enough stock")

            price = variant.product.price
            total_price += price * item.quantity

            OrderItem.objects.create(
                order=order,
                product=variant.product,
                quantity=item.quantity,
                price=price
            )

            from django.db.models import F

            updated = ProductVariant.objects.filter(
                id=variant.id,
                stock__gte=item.quantity
            ).update(stock=F("stock") - item.quantity)

            if not updated:
                raise Exception("Not enough stock")

        order.total_price = total_price
        order.save()

        items.delete()

    return order