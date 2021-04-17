const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const { urlencoded } = require("express");

// locating static file
app.use(express.static('./assets'));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressEjsLayouts);

// extracting styles and script file from subpages to the head
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// using Express router
app.use("/",require("./routes/injex.js"))


// Set up the view Engine
app.set("view engine", "ejs");
app.set("views","./views");




app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${port}`);
        }
    console.log(`Server is running on the port: ${port}`);  
});
