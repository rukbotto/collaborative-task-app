from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status

from .serializers import TaskSerializer


@api_view(["GET"])
def hello_world(_):
    return Response({"message": "Hello from Django!"})


@api_view(["POST"])
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")

    # Validate if email or password is empty
    if not email or not password:
        return Response({"error": "Email and password are required."}, status=400)

    # Authenticate using email and password
    user = authenticate(request, username=email, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
    
    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    except Exception as error:
        return Response(
            {"error": "Invalid token or logout failed"},
            status=status.HTTP_400_BAD_REQUEST
        )
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_task(request):
    """
    Create a new task using the JSON data sent in the request.
    """
    serializer = TaskSerializer(data=request.data)
    
    if serializer.is_valid():
        # Save the task
        task = serializer.save()
        return Response(
            TaskSerializer(task).data,
            status=status.HTTP_201_CREATED
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
