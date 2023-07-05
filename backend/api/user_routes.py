from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from backend.models import User, db
from sqlalchemy import func
from backend.forms import EditProfileForm

user_routes = Blueprint("users", __name__)


@user_routes.route("/")
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route("/<string:id>")
def user(id):
    user = User.query.get(id)
    if user:
        return user.to_dict()
    return {"message": "User not found"}, 404

@user_routes.route("/<string:id>", methods=['PUT'])
@login_required
def update_user(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    if not id == current_user.id:
        return {"message": "Forbidden"}, 403

    user = User.query.get(id)

    form = EditProfileForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user.name = form.data["name"]
        user.bio = form.data['bio']

        db.session.commit()
        return user.to_dict(), 201
    return {"message": "Bad Request"}, 400


@user_routes.route("/<int:userId>/followers")
def get_followers_by_userId(userId):
    follows = Follow.query.filter(Follow.following_id == userId).all()

    followers = []

    for follow in follows:
        user = User.query.filter(User.id == follow.follower_id).first()
        followers.append(user.to_dict())
    return {"Followers": followers}


@user_routes.route("/<int:userId>/following")
def get_followings_by_userId(userId):
    follows = Follow.query.filter(Follow.following_id == userId).all()

    followers = []

    for follow in follows:
        user = User.query.filter(User.id == follow.following_id).first()
        followers.append(user.to_dict())
    return {"Followers": followers}


@user_routes.route("/<int:userId>/follow", methods=["POST"])
@login_required
def post_follow_a_user(userId):
    user = User.query.filter(User.id == userId).first()

    if not user:
        return {"message": "User not found"}

    newFollow = Follow(
        following_id=userId, follower_id=current_user.id, createdAt=func.now()
    )

    db.session.add(newFollow)
    db.session.commit()

    return {"message": "success"}


@user_routes.route("/<int:userId>/following", methods=["DELETE"])
@login_required
def unfollow_a_user(userId):
    user = User.query.filter(User.id == userId).first()

    if not user:
        return {"message": "User not found"}

    follow = (
        Follow.query.filter(Follow.following_id == userId)
        .filter(Follow.follower_id == current_user.id)
        .first()
    )

    if not follow:
        return {"message": "Following not found"}

    db.session.delete(follow)
    db.session.commit()

    return {"message": "Successfully deleted"}
