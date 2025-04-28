from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import TaskSerializer
from .models import Task


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


class TaskPagination(PageNumberPagination):
    page_size = 25
    max_page_size = 25


class TasksView(ListCreateAPIView):
    """
    Handle tasks:
    - GET: Retrieve a paginated list of tasks.
    - POST: Create a new task using the JSON data sent in the request.
    """
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = TaskPagination

    def get_queryset(self):
        # Filter tasks to only include those created by the authenticated user
        return Task.objects.filter(created_by=self.request.user).order_by('start_date')

    def perform_create(self, serializer):
        # Associate the task with the currently authenticated user
        serializer.save(created_by=self.request.user)