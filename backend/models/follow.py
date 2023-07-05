from .db import db, environment, SCHEMA

class Follow(db.Model):
    __tablename__ = "follows"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    following_id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, primary_key=True)
    createdAt = db.Column(db.DateTime, nullable=False)
    UpdatedAt = db.Column(db.DateTime, nullable=False)

    followers = db.relationship(
    "User",
    secondary=__tablename__,
    primaryjoin=(__tablename__.c.follower_id == id),
    secondaryjoin=(__tablename__.c.following_id == id),
    backref="following",
)
