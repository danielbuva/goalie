from flask import Flask
from .config import Configuration
from flask_migrate import Migrate
# from .models import db
from .seeds import seed_commands

app = Flask(__name__)
app.config.from_object(Configuration)
# db.init_app(app)
# Migrate(app, db)
app.cli.add_command(seed_commands)
