from ..models.goal import Goal
from ..models.user import User
from flask import Blueprint

goal_routes = Blueprint('goals', __name__)

@goal_routes.route('/')
def get_all_goals():
    goals = Goal.query.all()

    return [goal.to_dict(User.query.filter(User.username == goal.userId).first()) for goal in goals]

@goal_routes.route('/<string:userId>')
def get_users_goals(userId):
    goals = Goal.query.filter(Goal.userId == userId).all()

    return [goal.to_dict() for goal in goals]
