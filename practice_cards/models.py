from django.db import models


class PracticeCard(models.Model):
    category = models.CharField(max_length=255)
    question = models.TextField(blank=False)
    answer = models.TextField(blank=False)
