# -*- coding: utf-8 -*

import pymysql, json, datetime
from config import Config
import os, json

def get_connection():
    try:
        if Config.config.get("debug_mode"):
            # localhost database
            return pymysql.connect(
                # user = data_connection.dev_database_user,
                # password = data_connection.dev_database_passw,
                # host = data_connection.dev_database_host,
                # database = data_connection.dev_database_name
            )
        else:
            # (In production: GearHost MySQL database)
            return pymysql.connect(
                # user = data_connection.database_user,
                # password = data_connection.database_passw,
                # host = data_connection.database_host,
                # database = data_connection.database_name
            )
    except Exception as e:
        raise e
        pass
