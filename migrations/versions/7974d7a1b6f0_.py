"""empty message

<<<<<<<< Updated upstream:migrations/versions/7974d7a1b6f0_.py
Revision ID: 7974d7a1b6f0
Revises:
Create Date: 2023-07-09 16:27:55.210649
========
Revision ID: 5ba372091daf
Revises:
Create Date: 2023-07-09 19:40:54.877643
>>>>>>>> Stashed changes:migrations/versions/5ba372091daf_.py

"""
from alembic import op
import sqlalchemy as sa


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
<<<<<<<< Updated upstream:migrations/versions/7974d7a1b6f0_.py
revision = '7974d7a1b6f0'
========
revision = '5ba372091daf'
>>>>>>>> Stashed changes:migrations/versions/5ba372091daf_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.String(length=40), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(length=160), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('banner', sa.String(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('challenges',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creatorId', sa.String(length=40), nullable=True),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['creatorId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE challenges SET SCHEMA {SCHEMA};")

    op.create_table('follows',
    sa.Column('follower_id', sa.String(length=40), nullable=False),
    sa.Column('following_id', sa.String(length=40), nullable=False),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['following_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('follower_id', 'following_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE follows SET SCHEMA {SCHEMA};")

    op.create_table('goals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.String(length=40), nullable=True),
    sa.Column('title', sa.String(length=50), nullable=True),
    sa.Column('body', sa.String(length=255), nullable=False),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE goals SET SCHEMA {SCHEMA};")

    op.create_table('doits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.String(length=40), nullable=True),
    sa.Column('goalId', sa.Integer(), nullable=True),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['goalId'], ['goals.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE doits SET SCHEMA {SCHEMA};")

    op.create_table('participants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.String(length=40), nullable=True),
    sa.Column('challengeId', sa.Integer(), nullable=True),
    sa.Column('completed', sa.Boolean(), nullable=True),
    sa.Column('joinedAt', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['challengeId'], ['challenges.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE participants SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('participants')
    op.drop_table('doits')
    op.drop_table('goals')
    op.drop_table('follows')
    op.drop_table('challenges')
    op.drop_table('users')
    # ### end Alembic commands ###
