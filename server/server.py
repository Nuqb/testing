from flask import Flask, request
from words import WordDB

app = Flask(__name__)

@app.route("/words/<int:word_id>", methods=["OPTIONS"])
def handle_cors_options(word_id):
    return "", 204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, DELETE, GET, POST",
        "Access-Control-Allow-Headers": "Content-Type"
    }

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

@app.route("/words/<int:word_id>", methods=["PUT"])
def update_word(word_id):
    print("the update request data is: ", request.form)
    db = WordDB("words_db.db")
    retrived_word = db.getWord(word_id)
    if retrived_word:
        word = request.form["word"]
        origin = request.form["origin"]
        definition = request.form["definition"]
        db.putWord(word_id, word, origin, definition)
        return "Updated", 200, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"word {word_id} Not found", 404, {"Access-Control-Allow-Origin" : "*"}

@app.route("/words", methods=["GET"])
def get_word():
    db = WordDB("words_db.db")
    WORDS = db.getWords()
    return WORDS, 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/words/<int:word_id>", methods=["GET"])
def get_word_by_id(word_id):
    db = WordDB("words_db.db")
    if db.getWord(word_id) is None:
        return f"word {word_id} Not found", 404, {"Access-Control-Allow-Origin" : "*"}
    else:
        db.getWord(word_id)
        return "retrived", 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/words/<int:word_id>", methods=["DELETE"])
def delete_word(word_id):
    db = WordDB("words_db.db")
    if db.getWord(word_id) is None:
        return f"word {word_id} Not found", 404, {"Access-Control-Allow-Origin" : "*"}
    else:
        db.deleteWord(word_id)
        return "Deleted", 200, {"Access-Control-Allow-Origin" : "*"}
    
@app.errorhandler(404)
def page_not_found(e):
    return {"error": "Resource not found"}, 404, {"Access-Control-Allow-Origin": "*"}


def run():
    app.run(host="0.0.0.0", port=8080, debug=True)

if __name__ == "__main__":
    run()