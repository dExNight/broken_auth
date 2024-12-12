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

@bp.route('/reset-password/request', methods=['POST'])
def request_reset():
    return AuthController.request_password_reset()

@bp.route('/reset-password/confirm', methods=['POST'])
def confirm_reset():
    return AuthController.reset_password()

@bp.route('/profile', methods=['PUT'])
def update_profile():
    return AuthController.update_profile()

@bp.route('/users/search', methods=['GET'])
def search_users():
    return AuthController.search_users()

@bp.route('/test')
def test():
    return {'message': 'Auth routes working!'}