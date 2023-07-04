from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length


class CompletedForm(FlaskForm):
    completed = BooleanField("completed", validators=[DataRequired()])
