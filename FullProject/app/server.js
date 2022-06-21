const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const dayjs = require("dayjs");
const methodOverride = require("method-override");

// Express Config
const app = express();
const PORT = 3000;
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(methodOverride("_method"));

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
};

async function addNewBook(title, author, pubdate){
    return new Promise( (resolve, reject) => {
        db.query("INSERT INTO book (titolo,autore,data_pubblicazione) VALUES (?,?,?);", [title, author, pubdate], (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows > 0) return resolve(1);
        });
    });
};

async function updateBook(title, author, pubdate, id){
    return new Promise( (resolve, reject) => {
        db.query("UPDATE book SET titolo=?, autore=?, data_pubblicazione=? WHERE id=?", [title, author, pubdate, id], (err, result) => {
            if (err) throw err;
            return resolve(1);
        })
    });
}

async function deleteBook(id){
    return new Promise( (resolve, reject) => {
        db.query("DELETE FROM book WHERE id=?", [id], (err, result, fields) => {
            if (err) throw err;
            return resolve(1);
        })
    });
}

async function getById(id){
    return new Promise( (resolve, reject) => {
        db.query("SELECT * FROM book WHERE id=?", [id], (err, result, fields) => {
            if (err) throw err;
            return resolve(result);
        });
    });
};

// Routes
app.get("/", async (req, res) => {
    let books = await getAllBooks();
    books.forEach(item => {
        item.data_pubblicazione = dayjs(item.data_pubblicazione).format("DD-MM-YYYY");
    })
    res.render('home', {pagetitle: "Books Directory", books: books});
});


app.get("/newbook", async (req, res) => {
    res.render("newbook", {pagetitle: "Add book"});
});

app.post("/newbook", async (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let pubdate = req.body.pubdate;

    let info = await addNewBook(title, author, pubdate);
    if (info === 1){
        res.render("newbook", {pagetitle: "Add book", msg: "Book inserted!"});
    }
    else res.render("newbook", {pagetitle: "Add book", msg: "Error!"});

});

app.get("/updatebook/:id", async (req, res) => {
    let book = await getById(req.params.id);
    book = book[0];
    book.data_pubblicazione = dayjs(book.data_pubblicazione).format("YYYY-MM-DD");
    res.render("updatebook", {pagetitle: "Update book", book: book});
});

app.put("/updatebook/:id", async (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let pubdate = req.body.pubdate;
    let { id } = req.params;

    let info = await updateBook(title, author, pubdate, id);
    if (info === 1){
        res.render("updatebook", {pagetitle: "Update book", msg: "Book updated!"});
    }
    else res.render("updatebook", {pagetitle: "Update book", msg: "Error"});

});

app.delete("/deletebook/:id", async (req, res) =>{
    let { id } = req.params;

    let info = await deleteBook(id);
    res.redirect("/");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
})