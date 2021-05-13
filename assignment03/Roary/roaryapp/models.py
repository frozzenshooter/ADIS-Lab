from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.

def convertDatetimeToString(o):
    DATE_FORMAT = "%Y-%m-%d" 
    TIME_FORMAT = "%H:%M:%S"

    if isinstance(o, datetime.date):
        return o.strftime(DATE_FORMAT)
    elif isinstance(o, datetime.time):
        return o.strftime(TIME_FORMAT)
    elif isinstance(o, datetime.datetime):
        return o.strftime("%s %s" % (DATE_FORMAT, TIME_FORMAT))
    else :
        return ""

class Roar(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    post = models.TextField(max_length=128)
    
    def __str__(self):
        return self.author.username+"["+convertDatetimeToString(self.date)+"]: "+self.post

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    roar = models.ForeignKey(Roar, on_delete=models.CASCADE)
    constraints = [
        models.UniqueConstraint(fields=['user', 'roar'], name='unique like per roar')
    ]

    def __str__(self):
        return self.user.username+" <3 "+ str(self.roar.id)
