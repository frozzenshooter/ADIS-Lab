from django.shortcuts import render
from django.http import JsonResponse
from .models import Roar, Like
from django.db.models import Count, F

def index(request):
    return render(request, 'index.html')

def roars(request):
    # Load all roars form the db and count the current likes and resolve the author name
    data = list(Roar.objects.all().annotate(likes=Count('like')).annotate(username = F('author__username')).values())
    
    #todo: annotated if the current user has liked the roar

    return JsonResponse(data, safe=False)

