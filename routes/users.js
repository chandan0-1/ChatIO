const express = require("express");
const router = express.Router();

const userctrlr = require("../controllers/users_controller");
router.get("/",userctrlr);
router.get("/chandan",userctrlr.chandan);
router.get("/profile",userctrlr.profile);

module.exports = router;