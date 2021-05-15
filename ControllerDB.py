# -*- coding: utf-8 -*

from flask_pymongo import PyMongo
from flask import jsonify, Request, Response
# from pymongo import MongoClient
import json, datetime, os
from config import Config
from datetime import datetime
from bson import json_util
from App import app

# from flask import Flask
# app = Flask(__name__)

# Database Settings:
db_user = Config.config["database"]["user"]
db_pass = Config.config["database"]["pass"]
db_host = Config.config["database"]["host"]
db_port = Config.config["database"]["port"]
db_name = Config.config["database"]["database"]

# app.config["MONGO_URI"] = "den1.mongo1.gear.host:27001/triviadatabase" # esto esta mal!
app.config["MONGO_URI"] = "mongodb://{}:{}@{}:{}/{}".format(db_user, db_pass, db_host, db_port, db_name)

mongo = PyMongo(app)

def insert_data(name):
    id_insert = mongo.db.users.insert(
        { "username": name }
    )
    return {"id": str(id_insert)}

def query_get_users():
    data = mongo.db.users.find()
    resp = json_util.dumps(data)
    return resp

def insert_new_game(game_object):
    id_insert = mongo.db.games.insert(game_object)
    return {"_id": str(id_insert)}

def get_game_by_id(id_game):
    data = mongo.db.games.find_one({ 'id_game': id_game })
    print(data)
    pass
