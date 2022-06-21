const express = require("express");
const router = express.Router();
const functions = require("../../functions");


router.get("/all", async (req, res) => {
    let data = await functions.getAllBooks();

    res.json(data);
});

router.get("/:id", async (req, res) => {

    let { id } = req.params;

    let data = await functions.getById(id);
    

    res.json(data);
});

module.exports = router;