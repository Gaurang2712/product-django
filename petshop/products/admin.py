from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'is_new')
    list_filter = ('category', 'is_new')
    search_fields = ('name', 'description')