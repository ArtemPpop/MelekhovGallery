from .models import Cart, ProductVariant
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import AddToCartSerializer, CreateOrderSerializer
from .services.cart_service import get_or_create_cart, add_item
from .services.order_service import create_order_from_cart
from .models import CartItem
from .serializers import CartItemSerializer

@api_view(["POST"])
def add_to_cart(request):
    serializer = AddToCartSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    cart = get_or_create_cart(request)

    variant = ProductVariant.objects.get(id=serializer.validated_data["variant_id"])
    quantity = serializer.validated_data["quantity"]

    add_item(cart, variant, quantity)

    return Response({"message": "Added"})

@api_view(["POST"])
def create_order(request):
    serializer = CreateOrderSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    cart = get_or_create_cart(request)

    try:
        order = create_order_from_cart(
            cart,
            request.user if request.user.is_authenticated else None,
            serializer.validated_data["email"],
            serializer.validated_data["phone"],
            serializer.validated_data["address"]
        )

        return Response({"order_id": order.id})

    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(["GET"])
def get_cart(request):
    cart = get_or_create_cart(request)
    items = CartItem.objects.filter(cart=cart)

    serializer = CartItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def remove_from_cart(request):
    cart = get_or_create_cart(request)

    variant_id = request.data.get("variant_id")

    CartItem.objects.filter(
        cart=cart,
        product_variant_id=variant_id
    ).delete()

    return Response({"message": "Removed"})