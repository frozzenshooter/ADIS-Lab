from django.contrib import admin
from roaryapp.models import Like, Roar

# Register your models here.
class RoarAdmin(admin.ModelAdmin):
    pass

class LikeAdmin(admin.ModelAdmin):
    pass

admin.site.register(Roar, RoarAdmin)
admin.site.register(Like, LikeAdmin)