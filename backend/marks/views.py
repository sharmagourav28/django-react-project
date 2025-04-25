from rest_framework.decorators import api_view  # type: ignore
from rest_framework.response import Response  # type: ignore
from .serializers import SubjectMarksSerializer


@api_view(["POST"])
def submit_marks(request):
    data = request.data
    subjects = data.get("subjects", {})

    flat_data = {
        "student_name": data.get(
            "student_name"
        ),  # Change to match the key in the request
        "pnr_number": data.get("pnr_number"),  # Same here
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
        # percentage = total / 8
        percentage = (total / 320) * 100  # Updated

        return Response(
            {
                "message": "Marks saved successfully!",
                "percentage": round(percentage, 2),
                "result": "Eligible" if percentage >= 60 else "Not Eligible",
            }
        )
    else:
        return Response(serializer.errors, status=400)
