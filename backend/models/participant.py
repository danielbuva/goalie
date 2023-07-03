from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Participant(db.Model):
    __tablename__ = "participants"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod("users.id")))
    challengeId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("challenges.id"))
    )
    completed = db.Column(db.Boolean)
    joinedAt = db.Column(db.DateTime, nullable=False)
