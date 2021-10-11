from flask_cors import CORS
from flask import Flask, jsonify
from flask.wrappers import Request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"

mongo = PyMongo(app)


@app.route('/', methods=['GET'])
def get_something():
    return "Message from backend"

@app.route("/user/<username>")
def user_profile(username):
    user = mongo.db.users.find_one_or_404({"_id": username})
    return render_template("user.html",
                           user=user)

# connect to MongoDB with the defaults
mongo1 = PyMongo(app, uri="mongodb://localhost:27017/databaseOne")

CORS(app)


if __name__ == "__main__":
    app.run(host='localhost')
