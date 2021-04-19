const express = require("express");
const router = express.Router();
const passport = require("passport");

const userctrlr = require("../controllers/users_controller");

router.get("/chandan",userctrlr.chandan);
router.get("/profile",passport.checkAuthentication, userctrlr.profile);

router.get("/sign-up",userctrlr.signUp);
router.get("/sign-in",userctrlr.signIn);

router.post("/create",userctrlr.create);

// router.post("/create-session",userctrlr.createSession);
// using passport as middleware to authentication
router.post("/create-session", passport.authenticate(
  "local",
  {failureRedirect: '/users/sign-in'},
), userctrlr.createSession);

router.get("/sign-out",userctrlr.destroySession);
module.exports = router;