from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class ChallengeForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(max=30)])
    body = StringField("body", validators=[DataRequired(), Length(min=1, max=255)])
