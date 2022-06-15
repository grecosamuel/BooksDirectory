const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const dayjs = require("dayjs")
// Express Config
const app = express();
const PORT = 3000;
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use(bodyParser.urlencoded({ extended: false }))

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

async function addNewBook(title, author, pubdate){
    return new Promise( (resolve, reject) => {
        db.query("INSERT INTO book (titolo,autore,data_pubblicazione) VALUES (?,?,?);", [title, author, pubdate], (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows > 0) return resolve(1);
        });
    });
}

// Routes
app.get("/", async (req, res) => {
    let books = await getAllBooks();
    books.forEach(item => {
        item.data_pubblicazione = dayjs(item.data_pubblicazione).format("DD-MM-YYYY");
    })
    res.render('home', {books: books});
});


app.get("/newbook", async (req, res) => {
    res.render("newbook");
});

app.post("/newbook", async (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let pubdate = req.body.pubdate;

    let info = await addNewBook(title, author, pubdate);
    if (info === 1){
        res.render("newbook", {msg: "Book inserted!"});
    }
    else res.render("newbook", {msg: "Error!"});

})


// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
})