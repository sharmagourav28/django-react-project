import logging
from rest_framework.decorators import api_view  # type: ignore
from rest_framework.response import Response  # type: ignore
from .serializers import SubjectMarksSerializer
from .models import SubjectMarks
from rest_framework import status  # type: ignore


# Check if PNR exists
@api_view(["GET"])
def check_pnr_exists(request):
    pnr_number = request.query_params.get("pnr_number")

    if not pnr_number:
        return Response(
            {"error": "PNR number not provided."}, status=status.HTTP_400_BAD_REQUEST
        )

    logging.info(f"Checking PNR: {pnr_number}")

    # Check if PNR exists in the database
    exists = SubjectMarks.objects.filter(pnr_number=pnr_number).exists()

    logging.info(f"PNR exists: {exists}")

    if exists:
        return Response({"exists": True}, status=status.HTTP_200_OK)
    else:
        return Response({"exists": False}, status=status.HTTP_200_OK)


# Submit Marks
@api_view(["POST"])
def submit_marks(request):
    data = request.data
    subjects = data.get("subjects", {})

    flat_data = {
        "student_name": data.get("student_name"),
        "pnr_number": data.get("pnr_number"),
        "dbms": subjects.get("Database", 0),
        "stats": subjects.get("Statistics", 0),
        "big_data": subjects.get("Big_data", 0),
        "python": subjects.get("Python_R_Programming", 0),
        "ml": subjects.get("Machine_Learning", 0),
        "visualization": subjects.get("Data_Visualization", 0),
        "java": subjects.get("Java_Programming", 0),
        "cloud": subjects.get("Linux_Programming_Cloud", 0),
    }

    serializer = SubjectMarksSerializer(data=flat_data)
    if serializer.is_valid():
        instance = serializer.save()
        total = (
            instance.dbms
            + instance.stats
            + instance.big_data
            + instance.python
            + instance.ml
            + instance.visualization
            + instance.java
            + instance.cloud
        )
        percentage = (total / 320) * 100

        return Response(
            {
                "message": "Marks saved successfully!",
                "percentage": round(percentage, 2),
                "result": "Eligible" if percentage >= 60 else "Not Eligible",
            }
        )
    else:
        return Response(serializer.errors, status=400)


# Get All Marks
@api_view(["GET"])
def get_all_marks(request):
    records = SubjectMarks.objects.all()
    serializer = SubjectMarksSerializer(records, many=True)
    return Response(serializer.data)
