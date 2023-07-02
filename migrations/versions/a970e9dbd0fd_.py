"""empty message

Revision ID: a970e9dbd0fd
Revises: 
Create Date: 2023-07-01 23:32:09.766408

"""
from alembic import op
import sqlalchemy as sa
import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = "a970e9dbd0fd"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(length=40), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("bio", sa.String(length=160), nullable=True),
        sa.Column("image", sa.String(), nullable=True),
        sa.Column("banner", sa.String(), nullable=True),
        sa.Column("createdAt", sa.Date(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("username"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    op.create_table(
        "challenges",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("creatorId", sa.Integer(), nullable=True),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("body", sa.String(), nullable=True),
        sa.Column("image", sa.String(), nullable=True),
        sa.Column("createdAt", sa.Date(), nullable=True),
        sa.ForeignKeyConstraint(
            ["creatorId"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE challenges SET SCHEMA {SCHEMA};")
    op.create_table(
        "follows",
        sa.Column("follower_id", sa.Integer(), nullable=False),
        sa.Column("following_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["follower_id"],
            ["users.id"],
        ),
        sa.ForeignKeyConstraint(
            ["following_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("follower_id", "following_id"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE follows SET SCHEMA {SCHEMA};")
    op.create_table(
        "goals",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("userId", sa.Integer(), nullable=True),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("body", sa.String(), nullable=True),
        sa.Column("image", sa.String(), nullable=True),
        sa.Column("doit", sa.Integer(), nullable=True),
        sa.Column("completed", sa.Boolean(), nullable=True),
        sa.Column("createdAt", sa.Date(), nullable=True),
        sa.ForeignKeyConstraint(
            ["userId"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE goals SET SCHEMA {SCHEMA};")
    op.create_table(
        "participants",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("userId", sa.Integer(), nullable=True),
        sa.Column("challengeId", sa.Integer(), nullable=True),
        sa.Column("completed", sa.Boolean(), nullable=True),
        sa.Column("joinedAt", sa.Date(), nullable=True),
        sa.ForeignKeyConstraint(
            ["challengeId"],
            ["challenges.id"],
        ),
        sa.ForeignKeyConstraint(
            ["userId"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE participants SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("participants")
    op.drop_table("goals")
    op.drop_table("follows")
    op.drop_table("challenges")
    op.drop_table("users")
    # ### end Alembic commands ###
