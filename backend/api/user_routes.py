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


@user_routes.route("/<string:userId>/followers")
def get_followers_by_userId(userId):

    user = User.query.filter(User.id == userId).first()

    followers = []

    for follow in user.following:
        followers.append(follow.to_dict())
    return {"Followers":followers}


@user_routes.route("/<string:userId>/following")
def get_followings_by_userId(userId):
    user = User.query.filter(User.id == userId).first()

    followers = []

    for user in user.followers:
        followers.append(user.to_dict())
    return {"Followers": followers}


@user_routes.route("/<string:userId>/follow", methods=["POST"])
@login_required
def post_follow_a_user(userId):
    print("INSIDE CREATE FOLLOW ROUTE")
    user = User.query.filter(User.id == userId).first()
    follower = User.query.filter(User.id == current_user.id).first()

    if not user:
        return {"message": "User not found"}, 404

    user.following.append(follower)

    db.session.add(user,follower)
    db.session.commit()

    return {"message": "success"}


@user_routes.route("/<string:userId>/following", methods=["DELETE"])
@login_required
def unfollow_a_user(userId):
    user = User.query.filter(User.id == userId).first()
    follower = User.query.filter(User.id == current_user.id).first()

    if not user:
        return {"message": "User not found"}

    if follower not in user.followers:
        return {"message": "Following not found"}

    # user.followers = [ user1 for user1 in user.followers if user1.id != current_user.id]

    user.followers.remove(follower)
    db.session.add(user,follower)
    db.session.commit()

    return {"message": "Successfully deleted"}
