# -*- coding: utf-8 -*

from flask_pymongo import PyMongo
# from pymongo import MongoClient
import json, datetime, os
from config import Config
from datetime import datetime
from App import app

mongo = PyMongo(app)

def get_connection():
    try:
        if Config.config.get("debug_mode"):
            pass
        else:
            pass
        pass
    except Exception as e:
        # throw the exception:
        raise e 

def insert_data(name):
    # Insert data in database:
    id_insert = mongo.db.user.insert(
        {"name": name}
    )
    return {"id": str(id_insert)}

def get_data():
    pass

# def get_connection():
#     try:
#         if Config.config.get("debug_mode"):
#             # localhost database
#             return pymysql.connect(
#                 # user = data_connection.dev_database_user,
#                 # password = data_connection.dev_database_passw,
#                 # host = data_connection.dev_database_host,
#                 # database = data_connection.dev_database_name
#             )
#         else:
#             # (In production: GearHost MySQL database)
#             return pymysql.connect(
#                 # user = data_connection.database_user,
#                 # password = data_connection.database_passw,
#                 # host = data_connection.database_host,
#                 # database = data_connection.database_name
#             )
#     except Exception as e:
#         raise e
#         pass
