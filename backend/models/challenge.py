from .db import db, environment, SCHEMA, add_prefix_for_prod


class Challenge(db.Model):
    __tablename__ = "challenges"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    createdAt = db.Column(db.DateTime, nullable=False)

    users = db.relationship("Participant", back_populates="challenge")
    creator = db.relationship("User", back_populates="challenges", foreign_keys=[creatorId])

    def to_dict(self, user=None):
        if user:
            return {
                "id": self.id,
                "user": {
                    "id": user.id,
                    "name": user.name,
                },
                "title": self.title,
                "creatorId": self.creatorId,
                "body": self.body,
                "image": self.image,
                "createdAt": self.createdAt,
            }
        else:
            return {
                "id": self.id,
                "title": self.title,
                "creatorId": self.creatorId,
                "body": self.body,
                "image": self.image,
                "createdAt": self.createdAt,
            }
