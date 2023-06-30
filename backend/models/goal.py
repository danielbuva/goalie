from .db import db, environment, SCHEMA

class Goal(db.Model):
    __tablename__ = 'goals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.String)
    body = db.Column(db.String)
    image = db.Column(db.String)
    doit = db.Column(db.Integer)
    completed = db.Column(db.Boolean)
    createdAt = db.Column(db.Date)

    user = db.relationship("User", back_populates="goals")
