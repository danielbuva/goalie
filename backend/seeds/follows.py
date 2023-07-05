from backend.models import follows, db, environment, SCHEMA, User
from sqlalchemy.sql import text
from datetime import date

def seed_follows():

    james = User.query.filter(User.id == "james").first()
    allen = User.query.filter(User.id == "allen").first()
    melodyyoo = User.query.filter(User.id == "melodyyoo").first()
    daniv = User.query.filter(User.id == "daniv").first()

    james.followers.append(allen)
    james.followers.append(melodyyoo)
    james.followers.append(daniv)
    allen.followers.append(james)

    all_follows = [james,allen,melodyyoo,daniv]
    add_follows = [db.session.add(follow) for follow in all_follows]
    db.session.commit()
    return all_follows

def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM follows"))

    db.session.commit()
