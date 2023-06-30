from .db import db, environment, SCHEMA

class Challenge(db.Model):
    __tablename__ = 'challenges'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.String)
    body = db.Column(db.String)
    image = db.Column(db.String)
    createdAt = db.Column(db.Date)

    users = db.relationship("User", secondary="participants", back_populates="joinchallenges")
    creator = db.relationship("User", back_populates="challenges")