from django.shortcuts import render
from .models import *
from django.contrib import messages
from .models import ContactMessage
from django.http import FileResponse
from django.shortcuts import render, get_object_or_404
from django.http import FileResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from .models import Book
from .models import Author

def featured_authors(request):
    authors = Author.objects.all()
    return render(request, 'index.html', {'authors': authors})

def index(request):
    latest_books = Book.objects.all().order_by('-id')[:4]
    authors = Author.objects.all()
    if request.method == "POST":
        subscribe = request.POST["subscribe"]

        # if not (subscribe):
        #     messages.error(request, "Please fill in all required fields.")
        #     return render(request)
        Subscription(
            subscribe=subscribe
        ).save()
    return render(request, "index.html", {'latest_books': latest_books,'authors': authors})


def about(request):
    return render(request, "about.html")


def popular(request):
    return render(request, "popular.html")


def books(request):
    return render(request, "books.html")


def subscribe(request):
    if request.method == "POST":
        subscribe = request.POST["subscribe"]

        if not (subscribe):
            messages.error(request, "Please fill in all required fields.")
            return render(request)
        Subscription(
            subscribe=subscribe
        ).save()

        messages.success(request, "Subscribed!")
    return render(request, messages.success(request, "Subscribed!"))


def contact(request):
    if request.method == "POST":
        # Safely get form data
        full_name = request.POST.get("fullName")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        # Validate required fields
        if not (full_name and email and subject and message):
            messages.error(request, "Please fill in all required fields.")
            return render(request, "contact.html")

        # Save the form data to the database
        ContactMessage.objects.create(
            full_name=full_name,
            email=email,
            subject=subject,
            message=message
        )

        # Provide feedback to the user
        messages.success(request, "Message sent successfully!")
        return render(request, "contact.html")

    # Display the form for GET requests
    return render(request, "contact.html")


def download(request):
    return render(request, "download.html")



def book_list(request):
    genre = request.GET.get('genre')
    author = request.GET.get('author')
    format = request.GET.get('format')
    query = request.GET.get('q')

    books = Book.objects.all()

    if query:
        books = books.filter(
            Q(title__icontains=query) |
            Q(author__icontains=query) |
            Q(genre__icontains=query) |
            Q(format__icontains=query)
        )

    if genre and genre != 'Genre':
        books = books.filter(genre=genre)
    if author and author != 'Author':
        books = books.filter(author=author)
    if format and format != 'Format':
        books = books.filter(format=format)

    # Pagination
    page = request.GET.get('page', 1)
    paginator = Paginator(books, 10)  # Show 10 books per page

    try:
        books = paginator.page(page)
    except PageNotAnInteger:
        books = paginator.page(1)
    except EmptyPage:
        books = paginator.page(paginator.num_pages)

    return render(request, 'books.html', {'books': books})

def download_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return FileResponse(book.file.open(), as_attachment=True)


def popular_books(request):
    popular_books = Book.objects.filter(popular=True)

    # Pagination
    page = request.GET.get('page', 1)
    paginator = Paginator(popular_books, 8)  # Show 10 books per page

    try:
        popular_books = paginator.page(page)
    except PageNotAnInteger:
        popular_books = paginator.page(1)
    except EmptyPage:
        popular_books = paginator.page(paginator.num_pages)

    return render(request, 'popular.html', {'books': popular_books})

def book_detail(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'book_detail.html', {'book': book})