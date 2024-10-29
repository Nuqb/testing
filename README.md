Project 4

Resource : Favorite Words

Attributes
Word (string)
Language Origin (string)
Word Definition (string)

Schema
```sql
CREATE TABLE favoritewords (
id INTEGER PRIMARY KEY,
word TEXT,
origin TEXT,
definition TEXT);
```
REST Endpoints

Name/Method/Path
Retrieve word collection / GET / /words
Retrieve word member / GET / /words/<id>
Create word member / POST / /words
Update word member / PUT / /words/<id>
Delete word member / DELETE / /words/<id>
