const express = require("express");
const router = express.Router();
const functions = require("../../functions");

router.delete("/:id", async (req, res) => {
    let { id } = req.params;

    let info = await functions.deleteBook(id);
    if (info == 1){
        res.json({
            msg: "Book deleted!"
        });
    }
    else if (info == 3){
        res.json({
            msg: "No book found!"
        });
    }
    else {
        res.writeHead(500, "Internal server error");
        res.end();
    }
});

module.exports = router;