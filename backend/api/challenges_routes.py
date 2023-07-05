from backend.models import db, Challenge, User, Participant
from flask import Blueprint, request
from flask_login import current_user,login_required
from backend.models import Challenge, Participant
from backend.forms import ParticipantForm, ChallengeForm, CompletedForm
from sqlalchemy import func

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

        allParticipants = Participant.query.filter(Participant.challengeId == challenge["id"]).all()
        challenge["participants"] = len(allParticipants)
        challenge["allParticipants"] = [participant.to_dict() for participant in allParticipants]

    return {"Challenges": allChallenges}, 200

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
        allParticipants = Participant.query.filter(Participant.challengeId == challenge["id"]).all()
        challenge["participants"] = len(allParticipants)
        challenge["allParticipants"] = [participant.to_dict() for participant in allParticipants]


    return {"Challenges": allChallenges}, 200


@challenge_routes.route("/new", methods = ["POST"])
@login_required
def create_challenge():
    form = ChallengeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        newChallenge = Challenge(
            title=data["title"],
            body=data["body"],
            image=data["image"],
            creatorId = current_user.id,
            createdAt=func.now()
        )

        db.session.add(newChallenge)
        db.session.commit()
        newParticipant = Participant(
        userId = current_user.id,
        challengeId = newChallenge.id,
        completed = False,
        joinedAt = func.now()
        )
        db.session.add(newParticipant)
        db.session.commit()
        newChallenge = newChallenge.to_dict()
        allParticipants = Participant.query.filter(Participant.challengeId == newChallenge["id"]).all()
        newChallenge["participants"] = len(allParticipants)
        newChallenge["allParticipants"] = [participant.to_dict() for participant in allParticipants]

        return newChallenge, 201
    return {
        "message":"Bad Request",
        "errors":data.errors
    }, 400


@challenge_routes.route("/<int:challengeId>",methods=["PUT"])
@login_required
def edit_challenge(challengeId):
    challenge = Challenge.query.filter(Challenge.id == challengeId).first()
    if not challenge:
        return {"message": "Challenge not found"}, 404
    if challenge.creatorId != current_user.id:
        return {"message": "Unauthorized"}, 404

    form = ChallengeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print("inside edit Challenge",form.data)
    if form.validate_on_submit():
        data = form.data
        challenge.title=data["title"]
        challenge.body=data["body"]
        challenge.image=data["image"]

        db.session.commit()
        challenge = challenge.to_dict()
        allParticipants = Participant.query.filter(Participant.challengeId == challenge["id"]).all()
        challenge["participants"] = len(allParticipants)
        challenge["allParticipants"] = [participant.to_dict() for participant in allParticipants]

        return challenge
    return {
        "message":"Bad Request",
        "errors":form.errors
    }, 400



@challenge_routes.route("/<int:challengeId>/participant", methods = ["DELETE"])
@login_required
def delete_participant_from_challenge(challengeId):
    challenge = Challenge.query.filter(Challenge.id == challengeId).first()
    if not challenge:
        return {"message": "Challenge not found"}, 404
    particant = Participant.query.filter(Participant.challengeId == challengeId).filter( Participant.userId == current_user.id).first()
    if particant:
        db.session.delete(particant)
        db.session.commit()
        return { "message": "Successfully deleted participance from challenge"}, 200
    return { "message": "Participance not found"}, 404



@challenge_routes.route("/<int:challengeId>/complete", methods = ["PUT"])
@login_required
def edit_challenge_completion(challengeId):
    challenge = Challenge.query.filter(Challenge.id == challengeId).first()
    if not challenge:
        return {"message": "Challenge not found"}, 404
    particant = Participant.query.filter(Participant.challengeId == challengeId).filter(Participant.userId == current_user.id).first()
    if not particant:
        return { "message": "Participance not found"} , 404

    form = CompletedForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
       data = form.data
       particant["completed"] = data["completed"]
       db.session.commit()
       return { "message" : "Successfully Changed Completion"}, 200
    return { "message": "Bad Request","errors": {"completed": "Completed is required"}}, 400



@challenge_routes.route("/<int:challengeId>/participants", methods = ["POST"])
@login_required
def join_challenge(challengeId):
    challenge = Challenge.query.filter(Challenge.id == challengeId).first()
    if not challenge:
        return {"message": "Challenge not found"}, 404
    particant = Participant.query.filter(Participant.challengeId == challengeId).filter(Participant.userId == current_user.id).first()
    if particant:
        return {"message": "Already participating"},400
    newParticipant = Participant(
        userId = current_user.id,
        challengeId = challengeId,
        completed = False,
        joinedAt = func.now()
    )

    db.session.add(newParticipant)
    db.session.commit()
    return newParticipant.to_dict()



@challenge_routes.route("/<int:challengeId>", methods = ["DELETE"])
@login_required
def delete_challenge(challengeId):
    challenge = Challenge.query.filter(Challenge.id == challengeId).first()
    if not challenge:
        return {"message": "Challenge not found"}, 404
    if challenge.creatorId != current_user.id:
        return {"message": "Unauthorized"}, 404
    db.session.delete(challenge)
    db.session.commit()
    return {"message": "Successfully deleted"}, 200
