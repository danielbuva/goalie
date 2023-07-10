from backend.models import Challenge, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_challenges():
    # categories = exercise, finance, food, social, study

    challenge1 = Challenge(
        creatorId="melodyyoo",
        title="Complete Triathlon",
        body="Train with a group of dedicated athletes in preparation for your local triathlon!",
        image="fitness",
        createdAt=date(2023, 6, 1),
    )

    challenge2 = Challenge(
        creatorId="daniv",
        title="Attend social event",
        body="I challenge YOU to go to one social event",
        image="social",
        createdAt=date(2023, 5, 24),
    )

    challenge3 = Challenge(
        creatorId="allen",
        title="Eating Salads",
        body="Eat at least one salad every day for a week",
        image="diet",
        createdAt=date(2023, 4, 12),
    )

    challenge4 = Challenge(
        creatorId="james",
        title="Roth IRA",
        body="Contribute 100$ to your Roth IRA every week.",
        image="finance",
        createdAt=date(2023, 5, 20),
    )

    challenge5 = Challenge(
        creatorId="bradthedad",
        title="Learn French",
        body="Bonjour who wants to dedicate an hour a day to learning French with me :D",
        image="study",
        createdAt=date(2023, 4, 19),
    )

    all_challenges = [challenge1, challenge2, challenge3, challenge4, challenge5]
    add_challenges = [db.session.add(challenge) for challenge in all_challenges]
    db.session.commit()
    return all_challenges


def undo_challenges():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.challenges RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM challenges"))

    db.session.commit()
