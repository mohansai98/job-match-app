from flask import Flask
from flask_cors import CORS
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)
    # CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    from app import routes
    app.register_blueprint(routes.bp)

    return app