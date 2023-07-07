from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from backend.models import User
from backend.AWS_helpers import ALLOWED_EXTENSIONS
from flask_wtf.file import FileField, FileAllowed, FileRequired

class EditProfileForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(min=1, max=40)])
    image = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    banner = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    bio = StringField("bio")
