from .db import db, environment, SCHEMA

class Participant(db.Model):
    __tablename__ = 'participants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    challengeId = db.Column(db.Integer, db.ForeignKey("challenges.id"))
    completed = db.Column(db.Boolean)
    joinedAt = db.Column(db.Date)
