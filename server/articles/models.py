from django.db import models

# Create your models here.

class Article(models.Model):
  title_text = models.CharField(max_length=200)
  creation_date = models.DateTimeField(auto_now_add=True)
  modification_date = models.DateTimeField(auto_now=True)
  article_text = models.TextField()
  is_draft = models.BooleanField(default=True)

  def __str__(self):
      return self.title_text
  