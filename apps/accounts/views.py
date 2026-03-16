from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from .serializers import RegisterSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {"message": "User created"},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
      user = request.user

      return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email
     })