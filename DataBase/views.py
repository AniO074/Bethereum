from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Match,Bet
from .serializers import *
# Create your views here.

@api_view(['GET','POST'])
def matchList(request):
    if (request.method == 'GET'):
        print(request)
        data = Match.objects.all()
        serializer = MatchSerializer(data,context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer=MatchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST','PUT'])
def betList(request):
    if (request.method == 'GET'):
        print(request)
        data = Bet.objects.all()
        serializer = BetSerializer(data,context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer=BetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])
def updateBet(request,id):
    data = Bet.objects.get(betNumber=id)
    if (request.method == 'GET'):
        serializer = BetSerializer(data)
        return Response(serializer.data)
    elif (request.method == "PUT"):
        serializer = BetSerializer(data,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','PUT','DELETE'])
def updateMatch(request,id):
    data = Match.objects.get(betNumber=id)
    if (request.method == 'GET'):
        serializer = MatchSerializer(data)
        return Response(serializer.data)
    elif (request.method == "PUT"):
        serializer = MatchSerializer(data,data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','PUT'])
def showBetsForMatch(request,id):
    data = Bet.objects.get(match=id)
    serializer = BetSerializer(data,context={'request': request}, many=True)
    return Response(serializer.data)