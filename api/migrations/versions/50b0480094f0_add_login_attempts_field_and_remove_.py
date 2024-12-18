"""Add login_attempts field and remove password hashing

Revision ID: 50b0480094f0
Revises: 0999eb9e8a9e
Create Date: 2024-12-05 16:29:51.700865

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '50b0480094f0'
down_revision = '0999eb9e8a9e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('login_attempts', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('login_attempts')

    # ### end Alembic commands ###
