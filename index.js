const express = require("express");
const app = express();
const port = 8000;


// using Express router
app.get("/",require("./routes/injex.js"))





console.log("hey");


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${port}`);
        }
    console.log(`Server is running on the port: ${port}`);  
});
