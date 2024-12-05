from flask import jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
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
            password=generate_password_hash(data['password'])
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

        if user and check_password_hash(user.password, data['password']):
            access_token = create_access_token(identity=str(user.id))
            return jsonify({
                "access_token": access_token,
                "user_id": user.id,
                "username": user.username
            }), 200

        return jsonify({"error": "Invalid username or password"}), 401

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
            "created_at": user.created_at.isoformat()
        }), 200