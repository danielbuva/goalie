from app.models import User, db
from sqlalchemy.sql import text

def seed_users():

    user1 = User(
        firstName="Melody",
        lastName="Yoo",
        username="melodyyoo",
        email="melody@gmail.com",
        bio="I wanna change my life who wants to help",
        image="",
        banner="",
        hashedPassword="",
        createdAt="2023-06-15"
    )
    user2 = User(
        firstName= "Dani",
        lastName= "Valdecantos",
        username= "daniv",
        email= "dani@yahoo.com",
        bio= "Finna live healthier",
        image= "",
        banner= "",
        hashedPassword= "",
        createdAt= "2023-03-26"
    )
    user3 = User(
        firstName= "Allen",
        lastName= "Huang",
        username= "allen",
        email= "allen@gmail.com",
        bio= "new year new me hahahaah",
        image="",
        banner="",
        hashedPassword="",
        createdAt="2023-04-10"
    )
    user4 = User(
        firstName="James",
        lastName="Hernandez",
        username="james",
        email= "james@yahoo.com",
        bio= "Eat.Code.Sleep.",
        image="",
        banner="",
        hashedPassword="",
        createdAt="2023-05-18"
    )
    demoUser = User(
        firstName="Brad",
        lastName="Simpson",
        username="bradthedad",
        email="bradthedad@gmail.com",
        bio="",
        image="",
        banner="",
        hashedPassword="",
        createdAt="2023-02-13"
    )

    all_users = [user1, user2, user3, user4, demoUser]
    add_users = [db.session.add(user) for user in all_users]
    db.session.commit()
    return all_users

def undo_users():
    db.session.execute(text("DELETE FROM users"))
    db.session.commit()
