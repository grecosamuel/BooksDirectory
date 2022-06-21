const express = require("express");
const router = express.Router();
const deleteRoute = require("./delete");
const getRoute = require("./get");
const updateRoute = require("./update");
const addRoute = require("./add");

router.use("/delete", deleteRoute);
router.use("/get", getRoute);
router.use("/update", updateRoute);
router.use("/add", addRoute);




module.exports = router;