from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import ValidationError


def is_boolean(form, field):
    if not isinstance(field.data, bool):
        raise ValidationError("completed must be a 'true' or 'false'")


class CompletedForm(FlaskForm):
    completed = BooleanField("completed", validators=[is_boolean])
