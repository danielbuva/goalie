from .db import db, environment, SCHEMA, add_prefix_for_prod


class Goal(db.Model):
    __tablename__ = "goals"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(50))
    body = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, nullable=False)

    doits = db.relationship("User", secondary = "doits", back_populates= "goals" )

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
                "completed": self.completed,
                "createdAt": self.createdAt,
            }
        else:
            return {
                "id": self.id,
                "title": self.title,
                "body": self.body,
                "completed": self.completed,
                "createdAt": self.createdAt,
            }
