from app.models import Goal, db
from sqlalchemy.sql import text

def seed_goals():

    goal1 = Goal(
        userId = 1,
        title = "Silence and solitude",
        body = "Meditate on the beach for an hour",
        doit = 3,
        completed = False,
        createdAt ="2023-06-16"
    )

    goal2 = Goal(
        userId = 2,
        title = "Make friends",
        body = "I wanna make 3 friends while climbing at the university's gym",
        doit = 2,
        completed = True,
        createdAt = "2023-04-01"
    )

    goal3 = Goal(
        userId =3,
        title = "Eat",
        body = "I am going to try all the foods in existence",
        doit = 4,
        completed = False,
        createdAt = "2023-05-03"
    )

    goal4 = Goal(
        userId = 4,
        title = "money money money",
        body = "I want financial freedom $$$",
        doit = 3,
        completed = False,
        createdAt ="2023-06-09"
    )

    goal5 = Goal(
        userId = 5,
        title = "Mow the Lawn",
        body = "I'm gonna mow the lawn every Wednesday after work for 2 months.",
        doit = 4,
        completed = False,
        createdAt ="2023-03-18"
    )
    goal6 = Goal(
        userId = 1,
        title = "Getting in shape",
        body = "Going to run 10 miles a day. Wish me luck!!!",
        doit = 1,
        completed = False,
        createdAt = "2023-06-20"
    )
    goal7 = Goal(
        userId = 2,
        title = "walking my cat",
        body = "I'm gonna walk my cat around the block every night for 2 weeks",
        doit = 3,
        completed = True,
        createdAt = "2023-05-12"
    )
    goal8 = Goal(
        userId = 3,
        title = "Create a Podcast",
        body = "It's been a life long dream to make a podcast. Finally gonna commit :) ",
        doit = 2,
        completed = True,
        createdAt = "2023-05-24"
    )

    goal9 = Goal(
        userId = 4,
        title = "Master a new recipe",
        body = "Gonna try to learn and master cooking lasagna!!",
        doit = 4,
        completed = True,
        createdAt ="2023-06-04"
    )

    goal10 = Goal(
        userId = 5,
        title = "Get 8 hours of sleep",
        body = "I've been sleeping really poorly lately :( Going to try getting 8 hours of sleep every night for at least a month.",
        doit = 4,
        completed = False,
        createdAt = "2023-03-10"
    )

    all_goals = [goal1, goal2, goal3, goal4, goal5, goal6, goal7, goal8, goal9, goal10]
    add_goals = [db.session.add(goal) for goal in all_goals]
    db.session.commit()
    return all_goals

def undo_goals():
    db.session.execute(text("DELETE FROM goals"))
    db.session.commit()
