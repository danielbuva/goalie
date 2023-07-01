from ..models.goal import Goal
from flask import Blueprint

goal_routes = Blueprint('goals', __name__)

@goal_routes.route('/')
def get_all_goals():
    goals = Goal.query.all()

    return[goal.to_dict() for goal in goals]
