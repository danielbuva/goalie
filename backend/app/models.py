from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String, nullable=False)
    lastName = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    bio = db.Column(db.String)
    image = db.Column(db.String)
    banner = db.Column(db.String)
    hashedPassword = db.Column(db.String)
    createdAt = db.Column(db.Date)

    participants = db.relationship("Participant", back_populates="user", cascade="all, delete, delete_orphan")
    goals = db.relationship("Goal", back_populates="user", cascade="all, delete, delete_orphan")
    challenges = db.relationship("Challenge", back_populates="user", cascade="all, delete, delete_orphan")


class Participant(db.Model):
    __tablename__ = 'participants'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    challengeId = db.Column(db.Integer, db.ForeignKey("challenges.id"))
    completed = db.Column(db.Boolean)
    joinedAt = db.Column(db.Date)

    user = db.relationship("User", back_populates="participants")
    challenge = db.relationship("Challenge", back_populates="participants")

class Goal(db.Model):
    __tablename__ = 'goals'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.String)
    body = db.Column(db.String)
    image = db.Column(db.String)
    doit = db.Column(db.Integer)
    completed = db.Column(db.Boolean)
    createdAt = db.Column(db.Date)

    user = db.relationship("User", back_populates="goals")

class Challenge(db.Model):
    __tablename__ = 'challenges'

    id = db.Column(db.Integer, primary_key=True)
    creatorId = db.Column(db.Integer, db.ForeignKey("users.id"))
    title = db.Column(db.String)
    body = db.Column(db.String)
    image = db.Column(db.String)
    createdAt = db.Column(db.Date)

    user = db.relationship("User", back_populates="challenges")
    participants = db.relationship("Participant", back_populates="challenge", cascade="all, delete, delete_orphan")

class Follow(db.Model):
    __tablename__ = 'follows'

    following_id = db.Column(db.Integer, db.ForeignKey())
    follower_id = db.Column(db.Integer, db.ForeignKey())
