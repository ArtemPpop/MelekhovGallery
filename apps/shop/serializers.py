import re

from rest_framework import serializers
from .models import CartItem, ProductVariant
from .models import Order, OrderItem



class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer()

    class Meta:
        model = CartItem
        fields = ["id", "product_variant", "quantity"]



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id", "email", "phone", "address",
            "total_price", "status", "created_at"
        ]


class AddToCartSerializer(serializers.Serializer):
    variant_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, max_value=100)

    def validate_variant_id(self, value):
        if not ProductVariant.objects.filter(id=value).exists():
            raise serializers.ValidationError("Variant not found")
        return value

    def validate(self, data):
        variant = ProductVariant.objects.get(id=data["variant_id"])

        if variant.stock < data["quantity"]:
            raise serializers.ValidationError("Not enough stock")

        return data


class CreateOrderSerializer(serializers.Serializer):
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20)
    address = serializers.CharField()

    def validate_phone(self, value):
        if not re.match(r'^\+\d{10,15}$', value):
            raise serializers.ValidationError("Invalid phone format")
        return value