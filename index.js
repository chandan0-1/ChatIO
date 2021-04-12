const express = require("express");
const app = express();
const port = 8000;


// using Express router
app.use("/",require("./routes/injex.js"))


// Set up the view Engine
app.set("view engine", ejs);
app.set("views","./views");




app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${port}`);
        }
    console.log(`Server is running on the port: ${port}`);  
});
