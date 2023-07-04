from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateTimeField
from wtforms.validators import DataRequired, Length

class ParticipantForm(FlaskForm):
    userId = IntegerField("userId", validators=[DataRequired()])
    challengeId = StringField("challengeId", validators=[DataRequired()])
    completed = BooleanField("completed",validators = [DataRequired()])
    joinedAt = DateTimeField("joinedAt", validators = [DataRequired()])
