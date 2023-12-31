from .db import db, environment, SCHEMA, add_prefix_for_prod


class Participant(db.Model):
    __tablename__ = "participants"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod("users.id")))
    challengeId = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("challenges.id"))
    )
    completed = db.Column(db.Boolean)
    joinedAt = db.Column(db.DateTime, nullable=False)

    user = db.relationship("User", foreign_keys=[userId], back_populates="joinChallenges")
    challenge = db.relationship("Challenge", foreign_keys=[challengeId], back_populates="users")

    def to_dict(self):
        return {
            "id":self.id,
            "userId":self.userId,
            "challengeId":self.challengeId,
            "completed": self.completed,
            "joinedAt":self.joinedAt
        }
