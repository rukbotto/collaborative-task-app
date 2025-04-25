from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

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
    
    return Response({"error": "Invalid credentials"}, status=401)
