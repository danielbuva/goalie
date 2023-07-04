from flask import Blueprint, request
from flask_login import current_user

follow_routes = Blueprint("follows", __name__)

# @follow_routes.route("/")
