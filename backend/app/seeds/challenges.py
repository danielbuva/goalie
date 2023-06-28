from app.models import Challenge, db
from sqlalchemy.sql import text

def seed_challenges():
# categories = exercise, finance, food, social, study

    challenge1 = Challenge(
        creatorId = 1,
        title = "Complete Triathlon",
        body = "Train with a group of dedicated athletes in preparation for your local triathlon!",
        image = "exercise",
        createdAt = "2023-06-01"
    )

    challenge2 = Challenge(
        creatorId = 2,
        title = "Attend social event",
        body = "I challenge YOU to go to one social event",
        image = "social",
        createdAt = "2023-05-24"
    )

    challenge3 = Challenge(
        creatorId = 3,
        title = "Eating Salads",
        body = "Eat at least one salad every day for a week",
        image = "food",
        createdAt ="2023-04-12"
    )

    challenge4 = Challenge(
        creatorId = 4,
        title = "Roth IRA",
        body = "Contribute 100$ to your Roth IRA every week.",
        image = "finance",
        createdAt ="2023-05-20"
    )

    challenge5 = Challenge(
        creatorId = 5,
        title = "Learn French",
        body = "Bonjour who wants to dedicate an hour a day to learning French with me :D",
        image = "study",
        createdAt ="2023-04-19"
    )

    all_challenges = [challenge1, challenge2, challenge3, challenge4, challenge5]
    add_challenges = [db.session.add(challenge) for challenge in all_challenges]
    db.session.commit()
    return all_challenges

def undo_challenges():
    db.session.execute(text("DELETE FROM challenges"))
    db.session.commit()
