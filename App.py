# -*- coding: utf-8 -*

from flask import Flask, render_template, request, json, send_from_directory, jsonify, Response
from flask_cors import CORS, cross_origin
# import datetime
# import os
from config import Config
from data import response_messages

app = Flask(__name__)
CORS(app)   # permit all origins

# static data:
users = [
    { "username": "admin" } # example struct
]
games = [
    {   # example struct:
        'id_game': 0,
        'topic_game': "paises",
        'username': 'admin',
        'current_round': 1,
        'total_correct': 0,
        'total_errors': 0
    }
]
#####################################################

@app.route("/", methods = ["GET"])
def index():
    return render_template("index.html")
    # return "Trivia"

app.route("/new_game_<username>", methods = ["GET"])
def new_game(username):
    try:
        for user in users:
            if user.get('name') == username:
                message = response_messages.msgs.get('username_not_available')
                return json.dumps({ 'status': False, 'message': message })
        # add user:
        users.append({ 'name': username })
        return json.dumps({ "status": True, "message": message })
    except Exception as e:
        print(e)
        return json.dumps({ "status": False, "message": "Error interno del servidor" })
    pass

# return css and static files:
@app.route('/public/<path:path>')
def send_css_and_media(path):
    return send_from_directory('public', path)

@app.errorhandler(404)
def page_not_found(error):
    return "404 not found"
    # return render_template("404errorPage.html")

# RUN:
def test():
    app.run(debug=True)

def run():
    app.run(debug=False)

if __name__ == '__main__':
    if (Config.config.get("debug_mode")):
        test()
    else: 
        run()


