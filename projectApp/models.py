from django.db import models

# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    image = models.ImageField(upload_to='authors/', null=True, blank=True)

    def __str__(self):
        return self.name

class ContactMessage(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.subject}"


class Subscription(models.Model):
    subscribe = models.EmailField()

    def __str__(self):
        return self.subscribe


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255, default='Unknown Author')
    genre = models.CharField(max_length=100, default='Unknown Genre')
    format = models.CharField(max_length=50, default='PDF')
    file = models.FileField(upload_to='books/', default='default_path/default_file.pdf')
    cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True, default='default_path/default_image.jpg')
    popular = models.BooleanField(default=False)  
    description = models.TextField(default='No description available.')


    def __str__(self):
        return self.title
