from backend.models import Participant, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_participants():

    participant1 = Participant(
        userId = 1,
        challengeId = 2,
        completed = False,
        joinedAt = date(2023,6,2)
    )
    participant2 = Participant(
        userId = 2,
        challengeId = 3,
        completed = True,
        joinedAt = date(2023,4,15)
    )
    participant3 = Participant(
        userId = 3,
        challengeId = 1,
        completed = False,
        joinedAt = date(2023,6,3)
    )
    participant4 = Participant(
        userId = 4,
        challengeId = 5,
        completed = False,
        joinedAt =date(2023,4,20)
    )
    participant5 = Participant(
        userId = 5,
        challengeId = 4,
        completed = True,
        joinedAt = date(2023,5,23)
    )
    participant6 = Participant(
        userId = 2,
        challengeId = 5,
        completed = True,
        joinedAt = date(2023,4,25)
    )
    participant7 = Participant(
        userId = 3,
        challengeId = 4,
        completed = False,
        joinedAt = date(2023,5,25)
    )

    all_participants = [participant1, participant2, participant3, participant4, participant5, participant6, participant7]
    add_participants = [db.session.add(participant) for participant in all_participants]
    db.session.commit()
    return all_participants

def undo_participants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.participants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM participants"))

    db.session.commit()
