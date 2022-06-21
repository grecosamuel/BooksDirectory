const mysql = require("mysql");

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


module.exports = db;