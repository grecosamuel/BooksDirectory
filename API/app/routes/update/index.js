const express = require("express");
const router = express.Router();
const functions = require("../../functions");

router.put("/:id", async (req, res) => {

    let { id } = req.params;
    let { title, author, pubdate } = req.body;


    let info = await functions.updateBook(title, author, pubdate, id);
    if (info == 1){
        res.json({
            msg: "Book updated!"
        });
    }
    else {
        res.writeHead(500, "Internal server error");
        res.end();
    }


});

module.exports = router;