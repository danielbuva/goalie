from .db import db, environment, SCHEMA

class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    following_id = db.Column(db.Integer, db.ForeignKey())
    follower_id = db.Column(db.Integer, db.ForeignKey())
