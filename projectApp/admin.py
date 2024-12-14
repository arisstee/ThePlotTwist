from django.contrib import admin
from .models import Author
from .models import Book
from .models import *
from .models import ContactMessage


# Import the Author model


# Register your models here.
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

admin.site.register(Author, AuthorAdmin)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'subject', 'created_at')
    search_fields = ('full_name', 'email', 'subject')

admin.site.register(Subscription)

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'format', 'popular')
    search_fields = ('title', 'author')
    list_filter = ('popular',)

admin.site.register(Book, BookAdmin)