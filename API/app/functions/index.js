const db = require("../connections")

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
            if (err) return reject(2);
            if (result.affectedRows > 0) return resolve(1);
        });
    }).catch( (err) => { return err; });
};

async function updateBook(title, author, pubdate, id){
    return new Promise( (resolve, reject) => {
        db.query("UPDATE book SET titolo=?, autore=?, data_pubblicazione=? WHERE id=?", [title, author, pubdate, id], (err, result) => {
            if (err) return reject(2);
            return resolve(1);
        })
    }).catch( (err) => { return err; });
}

async function deleteBook(id){
    return new Promise( (resolve, reject) => {
        db.query("DELETE FROM book WHERE id=?", [id], (err, result, fields) => {
            if (err) return reject(2);
            if (result.affectedRows > 0) return resolve(1);
            else return resolve(3);       
        })
    }).catch( (err) => { return err; });
}

async function getById(id){
    return new Promise( (resolve, reject) => {
        db.query("SELECT * FROM book WHERE id=?", [id], (err, result, fields) => {
            if (err) throw err;
            return resolve(result);
        });
    });
};

module.exports.addNewBook = addNewBook;
module.exports.getAllBooks = getAllBooks;
module.exports.getById = getById;
module.exports.deleteBook = deleteBook;
module.exports.updateBook = updateBook;