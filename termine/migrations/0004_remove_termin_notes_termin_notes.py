# Generated by Django 4.2.7 on 2024-02-02 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('termine', '0003_alter_termin_rent_timeframe'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='termin',
            name='notes',
        ),
        migrations.AddField(
            model_name='termin',
            name='notes',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
