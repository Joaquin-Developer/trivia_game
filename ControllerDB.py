# -*- coding: utf-8 -*

from flask_pymongo import PyMongo
from flask import jsonify, Request, Response
# from pymongo import MongoClient
import json, datetime, os
from config import Config
from datetime import datetime
from bson import json_util
from App import app

# Database Settings:
db_user = Config.config["database"]["user"]
db_pass = Config.config["database"]["pass"]
db_host = Config.config["database"]["host"]
db_port = Config.config["database"]["port"]
db_name = Config.config["database"]["database"]

# app.config["MONGO_URI"] = "den1.mongo1.gear.host:27001/triviadatabase" # esto esta mal!
app.config["MONGO_URI"] = "mongodb://{}:{}@{}:{}/{}".format(db_user, db_pass, db_host, db_port, db_name)

mongo = PyMongo(app)

def insert_user(username):
    try:
        id_insert = mongo.db.users.insert({ "username": username })
        return {"id": str(id_insert)}
    except Exception as e: raise e

def get_all_users():
    try:
        data = mongo.db.users.find()
        resp = json_util.dumps(data)
        return resp
    except Exception as e: raise e

def get_user_by_name(username):
    try:
        data = mongo.db.users.find_one({ 'username': username })
        resp = json_util.dumps(data)
        return resp
    except Exception as e: raise e

def insert_new_game(game_object):
    try:
        id_insert = mongo.db.games.insert(game_object)
        return {"_id": str(id_insert)}
    except Exception as e: raise e

def get_game_by_id(id_game):
    try:
        data = mongo.db.games.find_one({ 'id_game': id_game })
        print(data)
        # resp = json_util.dumps(data)
        # return resp
    except Exception as e: raise e

def update_game(game_object):
    pass

