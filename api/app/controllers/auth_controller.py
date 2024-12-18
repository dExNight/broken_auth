import random
import string
from flask import jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from app.models import User
from app import db

class AuthController:
    @staticmethod
    def register():
        data = request.get_json()
        
        if not all(k in data for k in ["username", "email", "password"]):
            return jsonify({"error": "Missing required fields"}), 400
        
        if User.query.filter_by(username=data['username']).first():
            return jsonify({"error": "Username already exists"}), 409
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"error": "Email already exists"}), 409

        user = User(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        
        try:
            db.session.add(user)
            db.session.commit()
            return jsonify({"message": "User created successfully"}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Could not register user"}), 500

    @staticmethod
    def login():
        data = request.get_json()
        
        if not all(k in data for k in ["username", "password"]):
            return jsonify({"error": "Missing required fields"}), 400
        
        user = User.query.filter_by(username=data['username']).first()
        
        if user and user.password == data['password']:
            access_token = create_access_token(identity=str(user.id))
            return jsonify({
                "access_token": access_token,
                "user_id": user.id,
                "username": user.username
            }), 200
            
        return jsonify({"error": "Invalid credentials"}), 401

    @staticmethod
    @jwt_required()
    def get_user_info():
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "password": user.password,
            "bio": user.bio,
            "created_at": user.created_at.isoformat()
        }), 200
            
        
    @staticmethod
    def request_password_reset():
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({"error": "Email is required"}), 400

        user = User.query.filter_by(email=email).first()
        
        if not user:
            return jsonify({"error": "Email not found"}), 404

        # No brute force protection
        reset_token = ''.join(random.choices(string.digits, k=6))
        
        user.reset_token = reset_token
        db.session.commit()

        # Return token not in email, but in response )
        return jsonify({
            "message": "Reset token generated",
            "token": reset_token,
            "email": email
        }), 200

    @staticmethod
    def reset_password():
        data = request.get_json()
        email = data.get('email')
        token = data.get('token')
        new_password = data.get('new_password')

        if not all([email, token, new_password]):
            return jsonify({"error": "Missing required fields"}), 400

        user = User.query.filter_by(email=email).first()

        if user and user.reset_token == token:
            user.password = new_password
            user.reset_token = None
            db.session.commit()
            return jsonify({"message": "Password has been reset"}), 200

        return jsonify({"error": "Invalid token"}), 400
    
    @staticmethod
    @jwt_required()
    def update_profile():
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        data = request.get_json()
        
        if 'bio' in data:
            user.bio = data['bio']
        
        try:
            db.session.commit()
            return jsonify({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "bio": user.bio,
                "created_at": user.created_at.isoformat()
            }), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": "Could not update profile"}), 500
        
    @staticmethod
    def search_users():
        query = request.args.get('username', '')
        users = User.query.filter(User.username.like(f'%{query}%')).all()
        
        return jsonify([{
            'id': user.id,
            'username': user.username,
            'bio': user.bio,  # Здесь может быть XSS
            'created_at': user.created_at.isoformat(),
            'email': user.email,  # Утечка email
        } for user in users]), 200