from flask import Flask, request
from words import WordDB

app = Flask(__name__)


@app.route("/words", methods=["POST"])
def create_word():
    print("the request data is: ", request.form)
    db = WordDB("words_db.db")
    print("the request data is: ", request.form)
    word = request.form['word']
    origin = request.form['origin']
    definition = request.form['definition']
    db.postWord(word, origin, definition)
    return "Created", 201, {"Access-Control-Allow-Origin": "*"}

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()