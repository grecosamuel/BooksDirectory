const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const routes = require("./routes/api");

// Express config 
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended: false}));





app.use("/api", routes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}... `);
})