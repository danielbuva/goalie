from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from backend.models import User


class EditProfileForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(min=1, max=40)])
    bio = StringField("bio")
