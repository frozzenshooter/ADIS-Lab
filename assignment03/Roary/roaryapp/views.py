from django.shortcuts import render
from django.http import JsonResponse
from .models import Roar, Like
from django.db.models import Count, F
from django.db.models import Exists, OuterRef
from django.utils.datastructures import MultiValueDictKeyError

def index(request):
    return render(request, 'index.html')

def roars(request):

    # Get id fomr an authenticated user
    current_user_id = -1

    if request.user.is_authenticated:
        current_user_id = request.user.id        

    # Subquery which will be used to check if a like from this user exists
    hasUserLiked = Like.objects.filter(roar=OuterRef('pk'), user=current_user_id)
    
    # Load all roars form the db and count the current likes and resolve the author name
    roars = Roar.objects.all().annotate(likes=Count('like')).annotate(username = F('author__username')).annotate(userHasLiked=Exists(hasUserLiked))
    data = list(roars.values())

    return JsonResponse(data, safe=False)

