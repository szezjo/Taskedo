from flask import Flask, jsonify
from flask.wrappers import Request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"

mongo = PyMongo(app)

# @app.route('/',methods = ['GET'])
# def get_something():
#     return jsonify({"Hello": "World"})

# @app.route('/kotek')
# def home_page():
#     online_users = mongo.db.users.find({"online": True})
#     return render_template("index.html",online_users=online_users)



@app.route("/")
def home_page():
    online_users = mongo.db.users.find({"online": True})
    return render_template("index.html",
        online_users=online_users)

@app.route("/user/<username>")
def user_profile(username):
    user = mongo.db.users.find_one_or_404({"_id": username})
    return render_template("user.html",
        user=user)

@app.route("/uploads/<path:filename>")
def get_upload(filename):
    return mongo.send_file(filename)

@app.route("/uploads/<path:filename>", methods=["POST"])
def save_upload(filename):
    mongo.save_file(filename, Request.files["file"])
    return redirect(url_for("get_upload", filename=filename))

# app = Flask(__name__)

# connect to MongoDB with the defaults
mongo1 = PyMongo(app, uri="mongodb://localhost:27017/databaseOne")

# connect to another MongoDB database on the same host
mongo2 = PyMongo(app, uri="mongodb://localhost:27017/databaseTwo")

# connect to another MongoDB server altogether
mongo3 = PyMongo(app, uri="mongodb://another.host:27017/databaseThree")

if __name__ == "__main__":
    mongo1.run()

