import sqlite3
from flask import Flask
from flask_restful import Api, Resource
from random import choice

app = Flask(__name__)

api = Api(app)

db = sqlite3.connect("main.db")

cur = db.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS main (
                id TEXT,
                name TEXT,
                contact TEXT,
                group_name TEXT
    )""")

cur.close()

db.close()

class get_donor(Resource):
    def get(self, name):

        db = sqlite3.connect("main.db")

        cur = db.cursor()

        cur.execute("SELECT * FROM main WHERE name = ?", name)

        data = cur.fetchall()

        cur.close()

        db.close()

        return data, 200

class register_donor(Resource):
    def post(self, name, group, contact):

        id_str = ["A", "C", "F", "1", "$", "*", "5", "8"]

        id = ""

        for i in range(0, 10):
            id = id + choice(id_str)

        db = sqlite3.connect("main.db")

        cur = db.cursor()

        cur.execute("INSERT INTO main (id, name, group_name, contact) VALUES (?, ?, ?, ?)", (id, name, group, contact,))

        db.commit()

        cur.close()

        db.close()

        return "Successfully changed data!", 200

api.add_resource(get_donor, "/get_donor/<string:name>")
api.add_resource(register_donor, "/register_donor/<string:name>/<string:group>/<string:contact>")

app.run(debug=True)