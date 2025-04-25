from django.db import models


class SubjectMarks(models.Model):
    student_name = models.CharField(max_length=100)
    pnr_number = models.CharField(max_length=20, unique=True)
    dbms = models.IntegerField()
    stats = models.IntegerField()
    big_data = models.IntegerField()
    python = models.IntegerField()
    ml = models.IntegerField()
    visualization = models.IntegerField()  # changed
    java = models.IntegerField()
    cloud = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student_name} ({self.pnr_number})"
