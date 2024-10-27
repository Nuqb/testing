import sqlite3

def dict_factory(cursor, row):
    fields = []

    for column in cursor.description:
        fields.append(column[0])
    
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class WordDB:

    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()

    def postWord(self, word, origin, definition):
        data = [word, origin, definition]
        self.cursor.execute("INSERT INTO favoritewords (word, origin, definition) VALUES (?, ?, ?)", data)
        self.connection.commit()

    def getWords(self):
        self.cursor.execute("SELECT * FROM words")
        return self.cursor.fetchall()
    
    def getWord(self, id):
        data = [id]
        self.cursor.execute("SELECT * FROM words WHERE id = ?", data)
        return self.cursor.fetchone()
    
    def putWord(self, id, word, origin, definition):
        data = [word, origin, definition, id]
        self.cursor.execute("UPDATE words SET word = ?, origin = ?, definition = ? WHERE id = ?", data)
        self.connection.commit()

    def deleteWord(self, id):
        data = [id]
        self.cursor.execute("DELETE FROM words WHERE id = ?", data)
        self.connection.commit()

# CREATE TABLE favoritewords (id INTEGER PRIMARY KEY, word TEXT, origin TEXT, definition TEXT);