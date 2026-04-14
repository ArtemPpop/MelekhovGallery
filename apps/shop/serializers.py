import re
from rest_framework import serializers
from .models import ProductVariant,  CartItem,Order,Product



class ProductVariantSerializer(serializers.ModelSerializer):
    # product = ProductSerializer()

    class Meta:
        model = ProductVariant
        fields = ["id", "product", 'size', "color", "stock"]

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    variants = ProductVariantSerializer(many=True, read_only=True)
    def get_image_url(self, obj):
        return obj.get_image_url()

    class Meta:
        model = Product
        fields = ["id", "name", "price", "image_url",'variants']


class CartItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer()

    class Meta:
        model = CartItem
        fields = ["id", "product_variant", "quantity"]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id", "email", 'phone', "address",
            "total_price", "status", "created_at"
        ]

class AddToCartSerializer(serializers.Serializer):
    variant_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1, max_value=100)

    def validate(self, data):
        try:
            variant = ProductVariant.objects.get(id=data["variant_id"])
        except ProductVariant.DoesNotExist:
            raise serializers.ValidationError({"variant_id": "Variant not found"})

        if variant.stock < data["quantity"]:
            raise serializers.ValidationError("Not enough stock")

        data["variant"] = variant
        return data

class CreateOrderSerializer(serializers.Serializer):
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20)
    address = serializers.CharField(max_length=100)

    def validate_phone(self, value):
        if not re.match(r'^\+\d{10,15}$', value):
            raise serializers.ValidationError("Invalid phone format")
        return value