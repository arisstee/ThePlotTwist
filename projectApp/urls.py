from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="homePage"),
    path("about/", views.about, name="aboutPage"),
    path("books/", views.books, name="booksPage"),
    path("contact/", views.contact, name="contact"),
    path('list/', views.book_list, name='book_list'),
    path('download/<int:book_id>/', views.download_book, name='download_book'),
    path("popular/", views.popular_books, name="popularPage"),
    path('book/<int:book_id>/', views.book_detail, name='book_detail'),

]
