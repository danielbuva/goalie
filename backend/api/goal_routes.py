from backend.models import db, Goal, User
from flask import Blueprint, request
from flask_login import current_user
from backend.forms import GoalForm

goal_routes = Blueprint("goals", __name__)


@goal_routes.route("/")
def get_all_goals():
    goals = Goal.query.all()

    return [goal.to_dict(User.query.get(goal.userId)) for goal in goals]


@goal_routes.route("/<string:userId>")
def get_users_goals(userId):
    goals = Goal.query.filter(Goal.userId == userId).all()

    return [goal.to_dict() for goal in goals]


@goal_routes.route("", methods=["POST"])
def create_goal():
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 403

    form = GoalForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        goal = Goal(
            userId=current_user.id,
            title=form.data["title"],
            body=form.data["body"],
        )
        db.session.add(goal)
        db.session.commit()
        return goal.to_dict(), 201
    return "Bad Request", 400
