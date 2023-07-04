from backend.models import db, User
from backend.models.follow import Follow
from flask import Blueprint, request
from flask_login import current_user

follow_routes = Blueprint("follows", __name__)

@follow_routes.route("/api/user/<int:userId>/followers")
def get_followers_by_userId(userId):
    followers = Follow.query.all()

# @follow_routes.route("/api/user/<int:userId>/following")
# def get_followings_by_userId(userId):

# @follow_routes.route("/api/user/<int:userId>/follow", methods=["POST"])
# def post_follow_a_user(userId):

# @follow_routes.route("/api/user/<int:userId>/following", methods=["DELETE"])
# def unfollow_a_user(userId):
