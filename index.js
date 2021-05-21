const express = require("express");
const env = require('./config/environment');
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");
const path = require("path");
// const { urlencoded } = require("express");

// used for session cookie
const session = require('express-session');
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy")

const mongoStore = require('connect-mongo')(session)//express-session

const sassMiddleware = require("node-sass-middleware");
const flash = require('connect-flash');
const customMware = require('./config/middleware');


// Setting up Socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat Server is listening on the port no: 5000");

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug:true,
    outputStyle:'extended',
    prefix:"/css"
}));

// locating static file
app.use(express.static(env.asset_path));

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
    secret: env.session_cookie_key,
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

app.use(flash());
app.use(customMware.setflash)

// using Express router
app.use("/",require("./routes/index.js"))

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${port}`);
        }
    console.log(`Server is running on the port: ${port}`);  
});
