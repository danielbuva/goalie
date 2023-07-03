from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Challenge(db.Model):
    __tablename__ = "challenges"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    createdAt = db.Column(db.Date, default=datetime.now())

    users = db.relationship(
        "User", secondary="participants", back_populates="joinchallenges"
    )
    creator = db.relationship("User", back_populates="challenges")
