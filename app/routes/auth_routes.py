from flask import Blueprint
from app.controllers.auth_controller import AuthController

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    return AuthController.register()

@bp.route('/login', methods=['POST'])
def login():
    return AuthController.login()

@bp.route('/me', methods=['GET'])
def get_user_info():
    return AuthController.get_user_info()

@bp.route('/test')
def test():
    return {'message': 'Auth routes working!'}