from flask import Blueprint, jsonify
from flask_login import login_required
from backend.models import User

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
    return User.query.get(id).to_dict()
