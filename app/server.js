const express = require("express");
const path = require("path");
const mysql = require("mysql");

// Express Config
const app = express();
const PORT = 3000;
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));


// MySQL Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'booksdir'
});

db.connect( (err) => {
    if (err) throw err;
    else console.log(`Database connected...`);
});

// Functions
async function getAllBooks(){
    return new Promise( (resolve, reject) => {
        db.query("SELECT * FROM book;", (err, result, fields) => {
            if (err) throw err;
            return resolve(result);
        });
    });
}

// Routes
app.get("/", async (req, res) => {
    let books = await getAllBooks();
    res.render('home', {books: books});
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
})