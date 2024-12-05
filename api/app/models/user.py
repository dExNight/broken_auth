from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    # Vulnerability: store pure password
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    # Field to track failed login attempts
    # But we will not use it, creating a vulnerability
    login_attempts = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<User {self.username}>'