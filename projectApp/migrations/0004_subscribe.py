# Generated by Django 5.1.4 on 2024-12-12 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projectApp', '0003_contactmessage_delete_contact'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscribe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subscribe', models.EmailField(max_length=254)),
            ],
        ),
    ]