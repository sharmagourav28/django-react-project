from django.urls import path
from .views import submit_marks, get_all_marks

urlpatterns = [
    path("api/marks/", submit_marks, name="marks-api"),
    path("api/records/", get_all_marks, name="get-all-records-api"),
]
