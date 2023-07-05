from backend.models import db, Goal, User, Doit
from flask import Blueprint, request
from flask_login import current_user
from backend.forms import GoalForm, CompletedForm
from sqlalchemy import func, and_
from flask_wtf.csrf import validate_csrf

goal_routes = Blueprint("goals", __name__)


@goal_routes.route("/")
def get_all_goals():
    goals = Goal.query.all()

    return [
        goal.to_dict(
            user=User.query.get(goal.userId),
            doits=Doit.query.filter(Doit.goalId == goal.id).all(),
        )
        for goal in goals
    ]


@goal_routes.route("/<string:userId>")
def get_users_goals(userId):
    if not User.query.get(userId):
        return {"message": "User not found"}, 404

    goals = Goal.query.filter(Goal.userId == userId).all()

    return [
        goal.to_dict(doits=Doit.query.filter(Doit.goalId == goal.id).all())
        for goal in goals
    ]


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
            createdAt=func.now(),
        )
        db.session.add(goal)
        db.session.commit()
        return goal.to_dict(current_user), 201
    return {"message": "Bad Request"}, 400


@goal_routes.route("/<int:id>", methods=["PUT"])
def edit_goal(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    goal = Goal.query.get(id)
    if not goal:
        return {"message": "Goal not found"}, 404

    if not goal.userId == current_user.id:
        return {"message": "Forbidden"}, 403

    form = GoalForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        goal.title = form.data["title"]
        goal.body = form.data["body"]
        goal.createdAt = func.now()

        db.session.commit()
        return goal.to_dict(), 201
    return {"message": "Bad Request"}, 400


@goal_routes.route("/<int:id>", methods=["DELETE"])
def delete_goal(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    goal = Goal.query.get(id)
    if not goal:
        return {"message": "Goal not found"}, 404

    if not goal.userId == current_user.id:
        return {"message": "Forbidden"}, 403

    goal = Goal.query.get(id)
    db.session.delete(goal)
    db.session.commit()
    return {"message": "success"}


@goal_routes.route("/<int:id>/doit", methods=["POST"])
def increment_doit(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    if not Goal.query.get(id):
        return {"message": "Goal not found"}, 404

    if Doit.query.filter(
        and_(Doit.goalId == id, Doit.userId == current_user.id)
    ).first():
        return {"message": "Doit already exists"}, 406

    doit = Doit(userId=current_user.id, goalId=id, createdAt=func.now())

    db.session.add(doit)
    db.session.commit()

    return {"message": "success"}


@goal_routes.route("/<int:id>/doit", methods=["DELETE"])
def decrement_doit(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    if not Goal.query.get(id):
        return {"message": "Goal not found"}, 404

    doit = Doit.query.filter(
        and_(Doit.goalId == id, Doit.userId == current_user.id)
    ).first()

    if not doit:
        return {"message": "Doit not found"}, 406

    db.session.delete(doit)
    db.session.commit()

    return {"message": "success"}


@goal_routes.route("/<int:id>/complete", methods=["PUT"])
def mark_as_complete(id):
    if not current_user.is_authenticated:
        return {"message": "Authentication required"}, 401

    goal = Goal.query.get(id)
    if not goal:
        return {"message": "Goal not found"}, 404

    if not goal.userId == current_user.id:
        return {"message": "Forbidden"}, 403

    form = CompletedForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        goal.completed = form.data["completed"]
        db.session.commit()
        return {"message": "success"}

    return {"message": "Bad Request"}, 400
