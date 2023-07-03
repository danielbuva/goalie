from .db import db, environment, SCHEMA, add_prefix_for_prod

class Doit(db.Model):
    __tablename__ = "doits"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod('users.id')))
    goalId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('goals.id')))
    createdAt = db.Column(db.DateTime, nullable=False)
