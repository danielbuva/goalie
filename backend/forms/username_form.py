from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from backend.models import User


def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.id == username).first()
    if user:
        raise ValidationError("Username is already in use.")


class UsernameForm(FlaskForm):
    username = StringField("username", validators=[DataRequired(), username_exists])
