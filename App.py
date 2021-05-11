# -*- coding: utf-8 -*

from flask import Flask, render_template, request, json, send_from_directory, jsonify, Response
from flask_cors import CORS, cross_origin
# import datetime
# import os
from config import Config

app = Flask(__name__)
CORS(app)   # permit all origins

@app.route("/", methods = ["GET"])
def index():
    return "Trivia"

def test():
    app.run(debug=True)

def run():
    app.run(debug=False)

if __name__ == '__main__':
    if (Config.config.get("debug_mode")):
        test()
    else: 
        run()


