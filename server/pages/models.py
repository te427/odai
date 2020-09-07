from django.db import models

# Create your models here.

class Page(models.Model):
  title_text = models.CharField(max_length=200)
  creation_date = models.DateTimeField()
  modification_date = models.DateTimeField()
  page_text = models.TextField()

  def __str__(self):
      return self.title_text
  