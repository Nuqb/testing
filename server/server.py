from flask import Flask, request, jsonify
from words import WordsDB

app = Flask(__name__)
db = WordsDB("words.db")  

@app.route('/words', methods=['GET'])
def get_words():
    words = db.get_all_words()
    return jsonify(words), 200

@app.route('/words', methods=['POST'])
def add_word():
    data = request.json

    word = data.get('word')
    language = data.get('language')
    definition = data.get('definition')
    user_translation = data.get('user_translation')

    if not all([word, language, definition, user_translation]):
        return jsonify({"error": "Missing required fields"}), 400

    db.add_word(word, language, definition, user_translation)
    return jsonify({"message": "Word added successfully!"}), 201

if __name__ == '__main__':
    app.run(debug=True)
