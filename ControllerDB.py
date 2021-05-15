# -*- coding: utf-8 -*

from flask_pymongo import PyMongo
from flask import jsonify, Response #, Request, Response
# from pymongo import MongoClient
import json
from config import Config
from bson import json_util
from App import app

# Database Settings:
db_user = Config.config["database"]["user"]
db_pass = Config.config["database"]["pass"]
db_host = Config.config["database"]["host"]
db_port = Config.config["database"]["port"]
db_name = Config.config["database"]["database"]

app.config["MONGO_URI"] = "mongodb://{}:{}@{}:{}/{}".format(db_user, db_pass, db_host, db_port, db_name)

mongo = PyMongo(app)

def insert_user(username):
    try:
        id_insert = mongo.db.users.insert({ "username": username })
        return True
        #return {"id": str(id_insert)}
    except Exception as e: raise e

def get_all_users():
    try:
        data = mongo.db.users.find()
        resp = json_util.dumps(data)
        print(resp)
        return resp
    except Exception as e: raise e

def get_user_by_name(username):
    try:
        data = mongo.db.users.find_one({ 'username': username })
        if data == None: return None
        else: return json_util.dumps(data)
    except Exception as e: raise e

def insert_new_game(new_game):   #(username, topic):
    try:
        id_insert = mongo.db.games.insert(new_game)
        return str(id_insert)
    except Exception as e: print("No se pudo insertar"); raise e


def get_game_by_id(id_game):
    try:
        data = mongo.db.games.find_one({ 'id_game': int(id_game) })
        print("Game: " + str(data))
        resp = json_util.dumps(data)
        return resp
    except Exception as e: raise e

def get_length_games():
    try:
        length = mongo.db.games.count()
        return length   # type: int
    except Exception as e: raise e

def update_game(game_object):
    try:
        id_game = int(game_object["id_game"])
        mongo.db.games.update_one({ "id_game": id_game }, {
          "$set": {
                'current_round': int(game_object["current_round"]),
                'total_correct': int(game_object["total_correct"]),
                'total_errors': int(game_object["total_errors"])
            }
        })
        return True
    except Exception as e: raise e

def delete_game(id_game):
    try:
        mongo.db.games.delete_one({ "id_game": id_game })
        return True
    except Exception as e: raise e

def insert_question(question_data):
    try:
        id_insert = mongo.db.questions.insert_many(question_data)
        return str(id_insert)
    except Exception as e: raise e

def get_question():
    # return all questions:
    try:
        data = mongo.db.questions.find()
        return json_util.dumps(data)
    except Exception as e: raise e

def get_all_questions_by_topic(topic):
    try:
        data = mongo.db.questions.find({ "topic": topic })
        resp = json_util.dumps(data)
        json_data = json.loads(resp)
        all_questions = json_data[0].get("all_questions")
        return all_questions
    except Exception as e: raise e

def get_question_by_topic_and_id(topic, id):
    try:
        pass    
    except Exception as e: raise e

