const express = require("express");
const router = express.Router();

const userctrlr = require("../controllers/users_controller");

router.get("/chandan",userctrlr.chandan);
router.get("/profile",userctrlr.profile);

router.get("/sign-up",userctrlr.signUp);
router.get("/sign-in",userctrlr.signIn);

router.post("/create",userctrlr.create);
router.post("/create-session",userctrlr.createSession);

module.exports = router;