from flask import Blueprint, jsonify, session, request
from backend.models import User, db
from backend.forms import LoginForm, SignUpForm, EmailForm, UsernameForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint("auth", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route("/")
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {"errors": ["Unauthorized"]}


@auth_routes.route("/login", methods=["POST"])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        email = User.query.filter(User.email == form.data["credential"]).first()
        username = User.query.get(form.data["credential"])
        if email:
            login_user(email)
            return email.to_dict()
        elif username:
            login_user(username)
            return username.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route("/logout")
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {"message": "User logged out"}


@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        user = User(
            email=form.data["email"],
            name=form.data["name"],
            password=form.data["password"],
            id=form.data["username"],
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": ["Unauthorized"]}, 401


@auth_routes.route("/email", methods=["POST"])
def check_email():
    form = EmailForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        return {"Message": "Success"}
    return {"email": form.errors["email"][0]}, 409


@auth_routes.route("/username", methods=["POST"])
def check_username():
    form = UsernameForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        return {"Message": "Success"}
    return {"username": form.errors["username"][0]}, 409
