const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport")
const app = express();
const http = require("http");
const server = http.createServer(app);

//Websockket
const socketio = require("socket.io");
const io = socketio(server);

//Passport config
require("./config/passport")(passport);

// DB config
const db = require("./config/keys").MongoURI;
const res = require("express/lib/response");
const passport1 = require("./config/passport");

// Connect to Mongo
mongoose.connect(db, { UseNewUrlParser: true})
.then(()=> console.log("MongoDB connected..."))
.catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({ extended: false}));

//Express Session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));

//Passport Middelware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})

//Routes
app.use('/', require('./routes/index'));
app.use("/users", require("./routes/users"));

//Listen for Chat Message
io.on("connection", socket => {
   // console.log("Websocket connected...");
    //Listen for Chat Message
    socket.on("NEWmessage", () => {
        io.emit("message");
       // console.log("Message ist auf dem Server angekommen");
    })

    //Chatraum wurde gelöscht
    socket.on("ChatroomDeleted", ()=>{
        io.emit("redirectIndex");
    })

    //Neuer Chatroom
    socket.on("NewRoom", ()=>{
        io.emit("Reload");
    })
})
const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log("Server started on port " + PORT));

module.exports = server;