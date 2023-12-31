from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


follows = db.Table(
    "follows",
    db.Model.metadata,
    db.Column(
        "follower_id",
        db.String(40),
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
    db.Column(
        "following_id",
        db.String(40),
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
)
if environment == "production":
    follows.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.String(40), primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(160))
    image = db.Column(db.String)
    banner = db.Column(db.String)
    createdAt = db.Column(db.DateTime, nullable=False)

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.following_id == id),
        secondaryjoin=(follows.c.follower_id == id),
        backref="following",
    )

    goals = db.relationship("Goal", back_populates="user",cascade="all, delete")
    joinChallenges = db.relationship(
        "Participant", back_populates="user", cascade="all, delete"
    )
    challenges = db.relationship("Challenge", back_populates="creator", foreign_keys="Challenge.creatorId", cascade="all, delete")

    doits = db.relationship("Doit", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def non_to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "bio": self.bio,
            "image": self.image,
            "banner": self.banner,
            "createdAt": self.createdAt
        }

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "bio": self.bio,
            "image": self.image,
            "banner": self.banner,
            "createdAt": self.createdAt,
            "followers": [user.non_to_dict() for user in self.followers],
            "following": [user.non_to_dict() for user in self.following]
        }
