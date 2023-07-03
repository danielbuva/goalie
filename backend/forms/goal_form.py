from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class GoalForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(max=50)])
    body = StringField("body", validators=[DataRequired(), Length(min=1, max=255)])
