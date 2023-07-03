from backend.models import db, Challenge, User, Participant
from flask import Blueprint, request
from flask_login import current_user
from datetime import datetime
from ..forms.challenge_form import ChallengeForm

challenge_routes = Blueprint("challenges", __name__)


@challenge_routes.route('/')
def get_all_challenges():
    challenges = Challenge.query.all()

    allChallenges = [challenge.to_dict() for challenge in challenges ]
    print("current", current_user.is_authenticated)
    for challenge in allChallenges:
        challenge["completed"] = False
        if True:
            hasCompleted = Participant.query.filter(Participant.userId == 2 and Participant.challengeId == challenge["id"] )
            print("completed", hasCompleted)
        ham = 5

    return allChallenges



# @challenge_routes.routes("/")
