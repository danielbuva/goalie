from backend.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        name="Melody Yoo",
        id="melodyyoo",
        email="melody@gmail.com",
        bio="I wanna change my life who wants to help",
        image="http://goalie-project.s3.amazonaws.com/76229a03815148e9becb89e051e6ab7b.jpeg",
        banner="",
        password="password",
        createdAt=date(2023, 6, 15),
    )
    user2 = User(
        name="Dani Valdecantos",
        id="daniv",
        email="dani@yahoo.com",
        bio="Finna live healthier",
        image="http://goalie-project.s3.amazonaws.com/65058e6db39240a293a93aff126779cb.jpeg",
        banner="",
        password="password",
        createdAt=date(2023, 3, 26),
    )
    user3 = User(
        name="Allen Huang",
        id="allen",
        email="allen@gmail.com",
        bio="new year new me hahahaah",
        image="http://goalie-project.s3.amazonaws.com/8d115e1a4eb143b893ea3128eefadca3.jpeg",
        banner="",
        password="password",
        createdAt=date(2023, 4, 10),
    )
    user4 = User(
        name="James Hernandez",
        id="james",
        email="james@yahoo.com",
        bio="Eat.Code.Sleep.",
        image="http://goalie-project.s3.amazonaws.com/c756bd9ea07b431e95ec93ebe52c5ae0.jpeg",
        banner="",
        password="password",
        createdAt=date(2023, 5, 18),
    )
    demoUser = User(
        name="Brad Simpson",
        id="bradthedad",
        email="bradthedad@gmail.com",
        bio="Instructor by day dad by night",
        image="http://goalie-project.s3.amazonaws.com/b059270f4db542a787f07a1ca0031065.jpeg",
        banner="",
        password="password",
        createdAt=date(2023, 2, 13),
    )

    all_users = [user1, user2, user3, user4, demoUser]
    [db.session.add(user) for user in all_users]
    db.session.commit()
    return all_users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
