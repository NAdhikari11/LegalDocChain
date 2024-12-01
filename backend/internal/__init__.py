from flask import Flask# type: ignore
from flask_cors import CORS # type: ignore
from flask_sqlalchemy import SQLAlchemy #type:ignore
from flask_restful import Api #type:ignore

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
api = Api(app)
CORS(app)

