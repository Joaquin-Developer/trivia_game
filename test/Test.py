
from flask import Flask, render_template, request, json, jsonify #, Response
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
        return json.dumps({"status": True, "id": id_insert})

    except Exception as e:
        print(e)
        return json.dumps({"status": False, "error": str(e)})

@app.route("/test_get_users_<username>", methods = ["GET"])
def get_users(username):
    try:
        data = ControllerDB.get_user_by_name(username)
        print(data)
        if data == None:
            return json.dumps({ "status": "none" })
        else:
            return json.dumps({ "status": "1 value" })
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


if __name__ == "__main__": app.run(debug=True)
