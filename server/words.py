import sqlite3
from datetime import datetime

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {fields[i]: row[i] for i in range(len(fields))}

class WordsDB:
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def get_all_words(self):
        self.cursor.execute("SELECT * FROM words")
        return self.cursor.fetchall()

    def get_word(self, word_id):
        self.cursor.execute("SELECT * FROM words WHERE id = ?", (word_id,))
        return self.cursor.fetchone()

    def add_word(self, word, language, definition, user_translation):
        date_added = datetime.now().isoformat()  
        data = (word, language, definition, user_translation, date_added)
        self.cursor.execute( "INSERT INTO words (word, language, definition, user_translation, date_added) VALUES (?, ?, ?, ?, ?)", data )
        self.connection.commit()
