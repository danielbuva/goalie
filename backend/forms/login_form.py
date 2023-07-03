from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from backend.models import User


def user_exists(form, field):
    # Checking if user exists
    credential = field.data
    email = User.query.filter(User.email == credential).first()
    username = User.query.filter(User.id == credential).first()
    if not email and not username:
        raise ValidationError("Email provided not found.")


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credential = form.data["credential"]
    email = User.query.filter(User.email == credential).first()
    username = User.query.get(credential)
    if not email and not username:
        raise ValidationError("No user found for the login provided")

    if (email and not email.check_password(password)) and (
        username and not username.check_password(password)
    ):
        raise ValidationError("Password was incorrect.")


class LoginForm(FlaskForm):
    credential = StringField("credential", validators=[DataRequired(), user_exists])
    password = StringField("password", validators=[DataRequired(), password_matches])
