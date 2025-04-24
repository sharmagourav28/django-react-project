from django.urls import path
from .views import submit_marks

urlpatterns = [
    path("api/marks/", submit_marks, name="marks-api"),
]
