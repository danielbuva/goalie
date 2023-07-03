from .db import db, environment, SCHEMA, add_prefix_for_prod

doit = db.Table(
    "doits",
    db.Model.metadata,
    db.Column(
        "userId",
        db.String(40),
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
    db.Column(
        "goalId",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("goals.id")),
        primary_key=True,
    ),
)
if environment == "production":
    doit.schema = SCHEMA


class Goal(db.Model):
    __tablename__ = "goals"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(50))
    body = db.Column(db.String(255), nullable=False)
    # doit = db.Column(db.Integer, default=0)
    completed = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, nullable=False)

    doit = db.relationship("")

    user = db.relationship("User", back_populates="goals")

    def to_dict(self, user=None):
        if user:
            return {
                "id": self.id,
                "user": {
                    "id": user.id,
                    "name": user.name,
                },
                "title": self.title,
                "body": self.body,
                "doit": self.doit,
                "completed": self.completed,
                "createdAt": self.createdAt,
            }
        else:
            return {
                "id": self.id,
                "title": self.title,
                "body": self.body,
                "doit": self.doit,
                "completed": self.completed,
                "createdAt": self.createdAt,
            }
