const db = require("./connection")

db.query("SELECT * FROM users")
.then((result) => console.log(result))
.catch((err) => console.log(err));

db.query("SELECT * FROM articles WHERE topic = 'coding'")
.then((result) => console.log(result))
.catch((err) => console.log(err));

db.query("SELECT * FROM comments WHERE votes < 0")
.then((result) => console.log(result))
.catch((err) => console.log(err));

db.query("SELECT * FROM topics")
.then((result) => console.log(result))
.then((err) => console.log(err));

db.query("SELECT * FROM articles WHERE author = 'grumpy19'")
.then((result) => console.log(result))
.then((err) => console.log(err));


db.query("SELECT * FROM comments WHERE votes > 10")
.then((result) => console.log(result))
.then((err) => console.log(err));



