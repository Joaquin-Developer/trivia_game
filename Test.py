# -*- coding: utf-8 -*

from flask import Flask, render_template, request, json, jsonify, Response
from flask_cors import CORS, cross_origin
import ControllerDB
import os, json

app = Flask(__name__)
# permit all origins:
CORS(app)

@app.route("/test_insert_<username>", methods = ["GET"])
def test_db_connection(username):
    try:
        id_insert = ControllerDB.insert_user(username)
        resp = json.dumps({"status": True, "id": id_insert})
        return Response(resp, mimetype="application/json")

    except Exception as e:
        print(e)
        return json.dumps({"status": False, "error": str(e)})

@app.route("/test_get_users_<username>", methods = ["GET"])
def get_users(username):
    try:
        # data = json.loads(ControllerDB.get_user_by_name(username))
        data = ControllerDB.get_user_by_name(username)

        if data == None:
            resp = json.dumps({ "status": False, "message": "No se encontró ningún dato" })
            return Response(resp, mimetype="application/json")
        else:
            data = json.loads(data)
            # remove _id:
            del data["_id"]
            resp = json.dumps({ "status": True, "user": json.dumps(data) })
            return Response(resp, mimetype="application/json")

    except Exception as e:
        print(e)
        return json.dumps({ "status": False, "error": str(e) })

@app.route("/test_delete_all_users", methods = ["GET"])
def delete_all_users():
    try:
        data = ControllerDB.delete_all_users()
        return json.dumps(data)
    except Exception as e:
        print(e)
        return json.dumps({ "status": False, "error": str(e) })

@app.route("/test_insert_game", methods = ["POST"])
def test_insert_game():
    json_req = request.get_json(force=True)
    # resp = ControllerDB.create_new_user(data.get("new_username"), data.get("new_password"))        

@app.route("/test_length_games", methods=["GET"])
def get_length_games():
    return str(ControllerDB.get_length_games())

@app.route("/test_delete_all_games", methods = ["GET"])
def delete_all_games():
    try:
        data = ControllerDB.delete_all_games()
        return json.dumps(data)
    except Exception as e:
        print(e)
        return json.dumps({ "status": False, "error": str(e) })

@app.route("/test_get_all_questions_by_topic_<topic>")
def get_all_questions_by_topic(topic):
    try:
        data = ControllerDB.get_all_questions_by_topic(topic)
        return json.dumps(data, ensure_ascii=False)
    except Exception as e:
        print(e)        
        return json.dumps({ "status": False, "error": str(e) })

@app.route("/test_insert_questions", methods = ["POST"])
def insert_questions():
    try:
        data = request.get_json(force=True)
        id_insert = ControllerDB.insert_question(data)
        print("ID: {}".format(id_insert))
        return json.dumps({ "status": True, "id_insert": str(id_insert) })
    except Exception as e:
        print(e)
        return json.dumps({ "status": False, "error": str(e) })

if __name__ == "__main__": app.run(debug=True)
