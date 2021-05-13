from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Roar(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    post = models.TextField(max_length=128)
    
    def __str__(self):
        return self.author.username+"["+self.date.strftime("%m/%d/%Y, %H:%M:%S")+"]: "+self.post

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    roar = models.ForeignKey(Roar, on_delete=models.CASCADE)
    constraints = [
        models.UniqueConstraint(fields=['user', 'roar'], name='unique like per roar')
    ]

    def __str__(self):
        return self.user.username+" <3 "+ str(self.roar.id)
