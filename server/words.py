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


# CREATE TABLE favoritewords (id INTEGER PRIMARY KEY, word TEXT, origin TEXT, definition TEXT);