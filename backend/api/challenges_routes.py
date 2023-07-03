from backend.models import db, Challenge, User, Participant
from flask import Blueprint, request
from flask_login import current_user
from datetime import datetime
from ..forms.challenge_form import ChallengeForm

challenge_routes = Blueprint("challenges", __name__)


@challenge_routes.route('/')
def get_all_challenges():
    challenges = Challenge.query.all()
    allChallenges = [challenge.to_dict() for challenge in challenges]

    for challenge in allChallenges:
        challenge["completed"] = False

        if current_user.is_authenticated:
            print("CURRENT_USER_INFO", current_user.to_dict())
            hasCompleted = Participant.query.filter(Participant.userId == current_user.id).filter(Participant.challengeId == challenge["id"]).first()
            hasCompleted = hasCompleted.completed if hasCompleted else False
            challenge["completed"] = hasCompleted

        challenge["participants"] = Participant.query.filter(Participant.challengeId == challenge["id"]).count()
    return {"Challenges": allChallenges}

@challenge_routes.route("/participants/<int:participantId>")
def get_all_user_challenges(participantId):
    # challenges = Challenge.query.filter(Challenge.creatorId == current_user.id).all()
    userChallenges = Participant.query.filter(Participant.userId == current_user.id).all()

    allChallenges = []
    for participant in userChallenges:
        challenge = Challenge.query.filter(Challenge.id == participant.challengeId).first()
        allChallenges.append(challenge.to_dict())

    for challenge in allChallenges:
        challenge["completed"] = False
        challenge["participantId"] = current_user.id
        hasCompleted = Participant.query.filter(Participant.userId == current_user.id).filter(Participant.challengeId == challenge["id"]).first()
        hasCompleted = hasCompleted.completed if hasCompleted else False
        challenge["completed"] = hasCompleted
        challenge["participants"] = Participant.query.filter(Participant.challengeId == challenge["id"]).count()

    return {"Challenges": allChallenges}
