# -*- coding: utf-8 -*

from flask import Flask, render_template, request, json, send_from_directory, jsonify, Response
from flask_cors import CORS, cross_origin
from config import Config
from data import response_messages
import os, json

app = Flask(__name__)
CORS(app)   # permit all origins

# static data:
users = [
    { "username": "admin" } # example struct
]
games = []
#####################################################

@app.route("/", methods = ["GET"])
def index():
    return render_template("index.html")
    # return "Trivia"

@app.route("/new_game_<username>_topic_<topic>", methods = ["GET"])
def new_game(username, topic):
    try:
        for user in users:
            if user.get('username') == username:
                message = response_messages.msgs.get('username_not_available')
                return json.dumps({ 'status': False, 'message': message }, ensure_ascii=False)

        users.append({ 'username': username }) # add user in list
        # add game in list:
        new_game = create_new_game(username, topic)
        games.append(new_game)
        message = response_messages.msgs.get('new_game_ok')
        return json.dumps({ 'status': True, 'message': message, 'game': new_game }, ensure_ascii= False)

    except Exception as e:
        print(e)
        return json.dumps({ "status": False, "message": "Error interno del servidor" }, ensure_ascii= False)
    pass

def create_new_game(username, topic):
    return {
        'id_game': (len(games) + 1),
        'topic_game': topic,
        'username': username,
        'current_round': 1,
        'total_correct': 0,
        'total_errors': 0
    }

def get_game(id):
    for elem in games:
        if elem.get('id_game') == id:
            return elem

def set_game(id, game):
    temp_game = []
    for elem in games:
        if elem.get('id_game') == id:
            elem = game
        temp_game.append(elem)
    
    return temp_game

def read_file():
    route = (os.environ["PP_ROUTE"] + "/trivia_game/data/trivia_data.json" )
    f = open(route, "r").read()
    return f

def get_json_data():
    return json.loads(read_file())

def get_answers():
    data = get_json_data()
    for elem in data:
        if elem.get('topic') == "Geografia":
            print(elem)
            return elem

def correct_answer(answer, ):
    pass    

@app.route("/answer_question_id_game_<idgame>", metohds = ["POST"])
def answer(idgame):
    try:
        game = get_game(int(idgame))

    except Exception as e:
        pass

    pass

@app.route("/get_new_question_id_<idgame>", methods = ["GET"])
def get_new_question(idgame):
    id_game = str(idgame)
    try:

        pass
    except Exception as e:
        return json.dumps({ "status": False, "message": "Error interno del servidor" }, ensure_ascii= False)
    pass

@app.route("/end_game_<username>", methods = ["GET"])
def end_game(username):
    try:
        # remove user from the list
        for index in range(0, len(users)):
            if users[index].get('username') == username:
                users.pop(index)
    except Exception as e:
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


