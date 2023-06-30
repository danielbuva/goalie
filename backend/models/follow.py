# from .db import db, environment, SCHEMA

# class Follow(db.Model):
#     __tablename__ =  "follows"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     follower_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#     following_id = db.Column(db.Integer, db.ForeignKey("users.id"))

#     follower = db.relationship("User", db.ForeignKey('following_id'))
#     following = db.relationship("User", db.ForeignKey('follower_id'))
