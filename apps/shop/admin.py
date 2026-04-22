from django.contrib import admin
from django import forms
from .models import Product, Category, ProductVariant, Cart, CartItem, Order, OrderItem
from .services.s3_service import get_s3_images
from django.utils.html import format_html

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

class ProductAdminForm(forms.ModelForm):
    s3_image = forms.ChoiceField(
        choices=[],
        required=False,
        label="Выбрать из S3"
    )

    class Meta:
        model = Product
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["s3_image"].choices = [("", "----")] + get_s3_images()

    def clean(self):
        cleaned_data = super().clean()
        s3_image = cleaned_data.get("s3_image")
        if s3_image:
            cleaned_data["image"] = s3_image
        return cleaned_data


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    inlines = [ProductVariantInline]
    list_display = ('name', 'price', 'category', 'is_active', 'created_at', 'variants_list')
    list_filter = ('is_active', 'category')
    search_fields = ('name', 'description')
    list_editable = ('price', 'is_active')
    ordering = ('-created_at',)
    def variants_list(self, obj):
        variants = obj.variants.all()
        if not variants:
            return "—"
        return " | ".join([f"{v.size}/{v.color} ({v.stock} шт.)" for v in variants])


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('id', 'name')

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'size', 'color', 'stock')
    list_editable = ('stock',)


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'session_id', 'created_at')
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product_variant', 'quantity')



@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'phone', 'total_price', 'status', 'created_at',"order_items")
    list_filter = ('status', 'created_at')
    search_fields = ('email', 'phone')
    inlines = [OrderItemInline]
    readonly_fields = ('total_price', 'created_at')
    def order_items(self, obj):
        items = obj.orderitem_set.all()
        if not items:
            return "—"
        return " | ".join([f"{item.product.name} x{item.quantity}" for item in items])


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'product', 'quantity', 'price')