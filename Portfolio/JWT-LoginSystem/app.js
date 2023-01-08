require("dotenv").config();
const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//Middleware+config
const credentials = require("./middleware/credentials");
const verifyJWT = require("./middleware/jwtVerification");
const usercookie = require("./middleware/ReqUser");
const corsOptions = require("./config/corsOptions");
const db = require("./config/db").MongoURI;

// Connect to Mongo
mongoose.connect(db, { UseNewUrlParser: true})
.then(()=> console.log("MongoDB connected..."))
.catch(err => console.log(err));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//EJS
app.set('views', __dirname + '/views');
app.use(expressLayouts);
app.set("view engine", "ejs");

//Trust Proxy
app.set('trust proxy', true)

//Json
app.use(express.json());

//Bodyparser
app.use(express.urlencoded({ extended: false}));

//middleware for cookies
app.use(cookieParser());

//middleware for req.user
app.use(usercookie);

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use(verifyJWT);
app.use("/users", require("./routes/users"))

app.all('*', (req, res) => {
    res.status(404);
    res.json({"error": "404 not found"})
});

//Port
const Port = process.env.PORT || 4000

//Server aufsetzen
app.listen(Port, console.log("Server started on Port "+Port))