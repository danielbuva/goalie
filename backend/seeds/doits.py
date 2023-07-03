from backend.models import Doit, db, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date


def seed_doits():
    # categories = exercise, finance, food, social, study

    doit1 = Doit(
        userId ="melodyyoo",
        goalId=2,
        createdAt=date(2023, 6, 1),
    )

    doit2 = Doit(
        userId ="daniv",
        goalId=1,
        createdAt=date(2023, 5, 24),
    )

    doit3 = Doit(
        userId ="allen",
        goalId=4,
        createdAt=date(2023, 4, 12),
    )

    doit4 = Doit(
        userId ="james",
        goalId=3,
        createdAt=date(2023, 5, 20),
    )

    doit5 = Doit(
        userId ="bradthedad",
        goalId=2,
        createdAt=date(2023, 4, 19),
    )

    doit6 = Doit(
        userId ="melodyyoo",
        goalId=5,
        createdAt=date(2023, 6, 1),
    )

    doit7 = Doit(
        userId ="daniv",
        goalId=3,
        createdAt=date(2023, 5, 24),
    )

    doit8 = Doit(
        userId ="allen",
        goalId=5,
        createdAt=date(2023, 4, 12),
    )

    doit9 = Doit(
        userId ="james",
        goalId=4,
        createdAt=date(2023, 5, 20),
    )

    doit10 = Doit(
        userId ="bradthedad",
        goalId=3,
        createdAt=date(2023, 4, 19),
    )

    all_doits = [doit1, doit2, doit3, doit4, doit5, doit6, doit7, doit8, doit9, doit10]
    add_doits = [db.session.add(doit) for doit in all_doits]
    db.session.commit()
    return all_doits


def undo_doits():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.doits RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM doits"))

    db.session.commit()
