const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
// const { urlencoded } = require("express");

// used for session cookie
const session = require('express-session');
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const mongoStore = require('connect-mongo')(session)//express-session

const sassMiddleware = require("node-sass-middleware");

app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:true,
    outputStyle:'extended',
    prefix:"/css"
}));

// locating static file
app.use(express.static('./assets'));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressEjsLayouts);

// extracting styles and script file from subpages to the head
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



// Set up the view Engine
app.set("view engine", "ejs");
app.set("views","./views");



// mongo store is used to store the session cookie in the DB
app.use(session({
    name:'chatio',
    // TODO changes before depylopment
    secret:"something",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*6000)
    },
    store: new mongoStore({
        mongooseConnection :db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || "connect mongodb setup OK")
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// using Express router
app.use("/",require("./routes/index.js"))

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${port}`);
        }
    console.log(`Server is running on the port: ${port}`);  
});
