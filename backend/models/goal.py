from .db import db, environment, SCHEMA, add_prefix_for_prod

class Goal(db.Model):
    __tablename__ = 'goals'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.username")))
    title = db.Column(db.String)
    body = db.Column(db.String)
    doit = db.Column(db.Integer)
    completed = db.Column(db.Boolean)
    createdAt = db.Column(db.Date)

    user = db.relationship("User", back_populates="goals")

    def to_dict(self, user=None):
        if user:
            return {
                'id': self.id,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'firstName': user.firstName,
                    'lastName': user.lastName
                },
                'title': self.title,
                'body': self.body,
                'doit': self.doit,
                'completed': self.completed,
                'createdAt': self.createdAt
            }
        else:
            return {
                'id': self.id,
                'title': self.title,
                'body': self.body,
                'doit': self.doit,
                'completed': self.completed,
                'createdAt': self.createdAt
            }
