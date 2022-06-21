const express = require("express");
const router = express.Router();
const functions = require("../../functions");

router.post("/", async (req, res) => {
    const { title, author, pubdate } = req.body;

    let info = await functions.addNewBook(title, author, pubdate);
    if (info == 1){
        res.json({
            msg: "Book added!"
        });
    }
    else {
        res.writeHead(500, "Missing value");
        res.end();
    }
});



module.exports = router;