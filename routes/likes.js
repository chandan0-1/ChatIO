const express = require("express");
const router = express.Router();

const likesCntrl = require('../controllers/likes_controllers');

router.post('./toggle', likesCntrl.toggleLike);
module.exports = router;
