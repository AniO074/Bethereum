from django.db import models

# Create your models here.
class Match(models.Model):
    matchNumber = models.IntegerField(primary_key=True)
    firstTeamNumber = models.IntegerField()
    secondTeamNumber = models.IntegerField()
    live = models.BooleanField(blank=True,default=True)
    
    def __str__(self):
        return (str(self.matchNumber))

class Bet(models.Model):
    matchNumber = models.ForeignKey(
        Match,
        on_delete=models.CASCADE,
    )
    betNumber = models.IntegerField(unique=True)
    firstPlayer = models.TextField()
    secondPlayer = models.TextField(blank=True)
    betAmount = models.DecimalField(max_digits=10,decimal_places=9)
    firstTeamStatus = models.BooleanField(default=False)
    secondTeamStatus = models.BooleanField(blank=True,default=False)
    contractAddress = models.TextField(blank=True)

    def __str__(self):
        return str(self.betNumber)


