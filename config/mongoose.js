const mongoose = require("mongoose");
const env = require('../config/environment');


mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting database"));

db.once("open",function(){
  console.log("connected to the database successsfully");
});

module.exports = db;