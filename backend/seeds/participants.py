from backend.models import Participant, db
from sqlalchemy.sql import text

def seed_participants():

    participant1 = Participant(
        userId = 1,
        challengeId = 2,
        completed = False,
        joinedAt = "2023-06-02"
    )
    participant2 = Participant(
        userId = 2,
        challengeId = 3,
        completed = True,
        joinedAt = "2023-04-15"
    )
    participant3 = Participant(
        userId = 3,
        challengeId = 1,
        completed = False,
        joinedAt = "2023-06-03"
    )
    participant4 = Participant(
        userId = 4,
        challengeId = 5,
        completed = False,
        joinedAt ="2023-04-20"
    )
    participant5 = Participant(
        userId = 5,
        challengeId = 4,
        completed = True,
        joinedAt = "2023-05-23"
    )
    participant6 = Participant(
        userId = 2,
        challengeId = 5,
        completed = True,
        joinedAt = "2023-04-25"
    )
    participant7 = Participant(
        userId = 3,
        challengeId = 4,
        completed = False,
        joinedAt = "2023-05-25"
    )

    all_participants = [participant1, participant2, participant3, participant4, participant5, participant6, participant7]
    add_participants = [db.session.add(participant) for participant in all_participants]
    db.session.commit()
    return all_participants

def undo_participants():
    db.session.execute(text("DELETE FROM participants"))
    db.session.commit()
