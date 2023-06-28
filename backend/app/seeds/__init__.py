from flask.cli import AppGroup
from .users import seed_users, undo_users
from .goals import seed_goals, undo_goals
from .participants import seed_participants, undo_participants
from .challenges import seed_challenges, undo_challenges

seed_commands = AppGroup("seed")

@seed_commands.command("all")
def seed():
    print("we are seeding")
    users = seed_users()
    challenges = seed_challenges()
    participants = seed_participants()
    goals = seed_goals()
    

@seed_commands.command("undo")
def undo():
    print("we are unseeding")
    undo_goals()
    undo_participants()
    undo_challenges()
    undo_users()
