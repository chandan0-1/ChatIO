const express = require("express");
const router = express.Router();

const homectrlr = require("../controllers/home_controller");


router.get("/", homectrlr.home);
router.use("/users",require("./users"));
router.use("/posts",require("./posts"));
router.use('/comments',require("./comments"));

router.use('/api', require('./api'));

module.exports = router;