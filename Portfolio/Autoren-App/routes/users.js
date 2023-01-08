const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const app = express();
const { ensureAuthenticated } = require("../config/auth");
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);


const socket = socketio(server);

// User Model
const user = require("../models/user");
const User = require("../models/user");

//Article Model
const Article = require("../models/articles");

//Room Model
const Room = require("../models/Chatrooms")

//Message Model
const Message = require("../models/ChatMessange");
const Comment = require("../models/comment");
const ChatRoom = require("../models/Chatrooms");
const Chatmessage = require("../models/ChatMessange");
const req = require("express/lib/request");

//Login Page
router.get('/login', (req,res) => res.render("login.ejs"));

//Register Page
router.get("/register", (req, res) => res.render("register.ejs"));

//Register Handle
router.post("/register", (req, res) =>{
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg:"Please fill in all fields"});
    }

    //Check Passwords match
    if(password !== password2){
        errors.push({ msg: "Passwords do not match"});
    }

    //Check password length
    if(password.length < 6){
        errors.push({ msg: "Password should be at least 6 characters"});
    }

    if(errors.length > 0){
       res.render("register", {
           errors,
           name,
           email,
           password,
           password2
       });
    } else{
        //Validation passed
        User.findOne({ email: email })
        .then(user =>{
            if(user){
               // User exist 
               errors.push({ msg: "Email is already registered" })
               res.render("register", {
                errors,
                name,
                email,
                password,
                password2
               })
            } else {
                User.findOne({name: name})
               .then(user=>{
                if (user){
                    //Name bereits vorhanden
                    errors.push({msg: "Dieser Benutzername existiert bereits. Wählen Sie einen anderen!"});
                    res.render("register", {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                })
               
            // Hash Passwort   
            bcrypt.genSalt(10, (err, salt)  => 
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) throw err;
                //set password to hashed
                newUser.password = hash;
                //Save User in Database
                newUser.save()
                .then(user =>{
                    req.flash("success_msg", "Your are now registered and can log in!")
                    res.redirect("/users/login");
                })
                .catch(err => console.log(err));
            }))        
           }
        });
    }
})
    }
});

//Login handle
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next);

});

//Logout Handle
router.get("/logout", (req, res)=> {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
})

module.exports = router;

//Profile
router.get("/profile", ensureAuthenticated, (req, res)=> 
res.render("profile", {
    name: req.user.name,
    email: req.user.email,
    date: req.user.date,
    rang: req.user.Rang
}));

// Delete Accounts
router.get("/delete", (req, res)=> {
    User.findById(req.user.id,(err, user)=> {
       if (user.name == req.user.name || req.user.Rang == "Admin"){
        console.log(user.id);
        if (err) throw err;
        function DeleteArticles() {
            Article.deleteMany({author: user.name}, (err, doc)=>{
                if (err) throw err;
                //DeleteArticles();
            }).clone()
            .then(DeleteComments())
        }
        function DeleteComments() {
            Comment.deleteMany({Cauthor: user.name}, (err, doc)=>{
                console.log("Help!")
                if (err) throw err;
                
            }).clone()
            //.then(DeleteComments())
            .then(DeleteChatMessages())
        }
        function DeleteChatMessages() {
            Room.find({users: user.name}, (err, rooms)=>{
                console.log(rooms);
               rooms.forEach(room=>{
                Chatmessage.deleteMany({toRoom: room.id}, (err, doc)=>{
                    if (err) throw err;
               })
                   // DeleteChatMessages()
                })
               DeleteChatrooms()
            })
        }
        function DeleteChatrooms() {
            ChatRoom.deleteMany({users: user.name}, (err, doc)=> {
                if (err) throw err;
               // DeleteChatrooms();
            }).clone()
            .then(DeleteUser());
        }

        function DeleteUser() {
            User.findByIdAndRemove(user.id, (err, doc)=>{
                if (err) throw err;
                req.flash("success_msg", "Account wurde gelöscht");
                res.redirect("/users/login");
            })
        }
        
        //Funktionen aufrufen
        DeleteArticles();
       } else{
        res.send("<h1>You are not allowed to view this resource</h1><a href='/users/login'>ok</a>")
       }
        
    }) ;
})

//Settings
router.get("/settings", ensureAuthenticated, (req, res)=>
    res.render("settings", {
        name: req.user.name,
        email: req.user.email,
        date: req.user.date,
        rang: req.user.rang
    }));

//Settings Change Handle

router.post("/settings", (req, res, next) => {
    const { name, email, newPassword, oldPassword} = req.body;
    let errors = [];
    User.findOne({ email: req.body.email })
        .then(user =>{
            if(user){
                //no changes
                if (req.user.email == req.body.email){
                    console.log("Email ist identisch wie vorher");
                    //console.log(updatedPassword)
                    User.findByIdAndUpdate(req.user.id, { name: req.body.name, email: req.body.email}, (err, doc) =>{
                        if (err) throw err;
                        req.flash("success_msg", "Accountdaten wurden geupdatet. Bitte loggen Sie sich erneut ein!")
                        res.redirect("/users/login");
                        return;
                })
                }else{
                // User exist 
               errors.push({ msg: "Diese Email existiert bereits!" })
               console.log("Email bereits in Datenbank enthalten!")
               res.render("settings", {
                   errors,
                   name,
                   email,
                   password
               })
                };
                
                
            } else {
            User.findByIdAndUpdate(req.user.id, { name: req.body.name, email: req.body.email}, (err, doc) =>{
                if (err) throw err;
                req.flash("success_msg", "Accountdaten wurden geupdatet. Bitte loggen Sie sich erneut ein!")
                res.redirect("/users/login");
        })
        }})});

// Schreib-Request
router.get("/create", ensureAuthenticated,(req, res) => {
    //res.send("Hier kommt noch was")
    res.render("writeStation");
})

//Collection Request
router.get("/personalCollection", ensureAuthenticated, (req, res)=>{
    Article.find({authorID : req.user.id}, function (err, articles){
        res.render("collection" , {
            articlesList : articles
        })
    })
})

// Personal Article (create)
router.post("/create", (req, res, next)=>{
    let errors = [];
    const {title, summary, content, genre} = req.body;
    const author = req.user.name;
    const authorID = req.user.id;
    const Status = "private";
    //res.send("Erstellt");
    if (!title || !summary || !content || !genre){
        //Nicht alles ausgefüllt
        errors.push({ msg: 'Fülle alle Felder aus. Keine Sorge, der Hauptteil der Geschichte wurde in deiner persönlichen Collection gespeichert'})
               res.render("writeStation", {
                errors,
                title,
                summary,
                content,
                genre
            });
    } else {
        function createAnewArticle(article) {
            const createArticle = new Article ({
                author,
                title,
                summary,
                content,
                genre,
                authorID,
                Status
            })
            //console.log(req.body.title)
            createArticle.save();
            res.redirect("/users/personalCollection")
        };
        createAnewArticle();
        }
        
    }
)

//Alle Chats vom User laden + Anzeigen in welchen Chats es neue Nachrichten gubt
router.get("/chats/view(/*)?", ensureAuthenticated,(req, res)=> {
    //console.log(req.params['1']);
        Room.find({users: req.user.name}, (err, rooms) =>{
        res.render("ChatIndex", {
            newMember: req.params['1'],
            RoomList: rooms,
            newMessages: req.user.newMessanges,
        })
    })
})





//Neuen Chatroom createn
router.post("/chats", ensureAuthenticated,(req, res)=>{
    let errors= [];
    const {users, Name} = req.body;
    User.findOne({name: users})
    .then(user=>{
        if (user){
            let users = [req.user.name, req.body.users];
            const newRoom = new Room({
                users,
                Name
            })
            newRoom.save();
            req.flash("success_msg", "Raum erfolgreich erstellt!");
            res.redirect("/users/chats/view");
        } else {
            errors.push({msg: "Es gibt keinen Benutzer mit diesem Namen"});
            Room.find({users: req.user.name}, (err, rooms) =>{
                res.render("ChatIndex", {
                    RoomList: rooms,
                    newMessages: req.user.newMessanges,
                    errors
                })
            })
        }
    })
});

//Bestimmten Chatraum laden
router.get("/chats/:id", ensureAuthenticated,(req, res)=> {
     //Alle User im Chat newMessanges updaten
     Room.findById(req.params.id, (err, room)=> {
        // console.log("Test2"+ room)
            User.findOneAndUpdate({name: req.user.name}, {$pull: {newMessanges: room.id}}, (err, doc)=>{
                if (err) throw err;
            })
        
    })
    
    //Raum Mitglieder und Nachrichten laden
    Room.findById(req.params.id, (err, room)=> {
       // console.log(room.users);
        let Members = room.users
        if (Members.includes(req.user.name)){
            //Nutzer der versucht auf den Chat zuzugreifen ist auch in der Gruppe
            Message.find({toRoom: req.params.id}, (err, messages)=>{
                res.render("PersonalChat", {
                    Name: room.Name,
                    Users: room.users,
                    RoomID : room.id,
                    MessageList: messages,
                    user: req.user.name
                })
            })
        }else{
            req.flash("error_msg", "Sie haben nicht die Berechtiung auf diesen Chat zuzugreifen");
            res.redirect("/users/chats/view")
        }
    })
});


//Nachricht über Profil schicken
router.get("/:name/newChat", ensureAuthenticated,(req, res)=>{
    let Members = [req.user.name, req.params.name];
    let Members2 = [req.params.name, req.user.name];
    Room.findOne({users: Members}, (err, room)=>{
        //console.log(room);
        if(room != "" && room != undefined && room != null){
            //Chatraum bereits vorhanden
           // console.log("Raum wurde gefunden");
            //console.log("2"+ room.Name);
            res.redirect("/users/chats/" + room._id)
        }else{
            Room.findOne({users: Members2}, (err, room)=>{
                if(room != "" && room != undefined && room != null){
                    //Chatraum vorhanden 
                    res.redirect("/users/chats/" + room._id);
                }else{
                    //Chatraum noch nicht vorhanden
                    // console.log("Raum wurde nicht gefunden")
                    //res.send("In arbeit...")
                    req.flash("error_msg", "Erstellen sie bitte zunächst einen Chatraum mit dem  folgendem Nutzer: "+req.params.name + "    ")
                    res.redirect("/users/chats/view/" + req.params.name)
                }
            })
        }
    })
})


//neue Nachricht schicken
router.post("/chats/:id", ensureAuthenticated,(req, res)=>{
    let errors = [];
    const {MessageContent} = req.body;
    const toRoom = req.params.id;
    const authorM = req.user.name;
    const MauthorID = req.user.id;
    
    //neue Message erstellen
    const newMessage = new Message({
        toRoom,
        authorM,
        MessageContent,
        MauthorID
    });
     
    //Alle User im Chat newMessanges updaten
    Room.findById(req.params.id, (err, room)=> {
        const users= room.users;
        users.forEach(user=>{
            User.findOneAndUpdate({name: user}, {$push: {newMessanges: room.id}}, (err, doc)=>{
                if (err) throw err;
            })
        })
    })
    newMessage.save();

    res.redirect("/users/chats/"+req.params.id);
})

//Chat-Message löschen
router.get("/chats/:roomID/deletemsg/:MessageID", (req, res)=>{
    Message.findById(req.params.MessageID, (err, message)=>{
        if (message.authorM == req.user.name || req.user.Rang == "Admin"){
            Message.findByIdAndRemove(req.params.MessageID, (err, doc)=>{
               Room.findById(req.params.roomID, (err, room)=>{
                   const users = room.users;
                   users.forEach(user => {
                       User.findOneAndUpdate({name: user}, {$pull: {newMessanges: room.id}}, (err, doc)=>{
                        if (err) throw err;
                        
                       })
                   })
               })
            })
            res.redirect("/users/chats/"+req.params.roomID)
        } else{
            res.send("<h1>You are not allowed to do that</h1><a href='/users/login'>ok</a>")
        } 
    })
   
});

//Raum löschen
router.get("/chats/deleteRoom/:roomid", ensureAuthenticated, (req, res)=> {
    //Alle new Messanges löschen
    Room.findById(req.params.roomid, (err, room)=> {
        const users = room.users;
        users.forEach(user=>{
            User.findOneAndUpdate({name: user}, {$pull: {newMessanges: room.id}}, (err, doc)=>{
                if (err) throw err;
            })
        })
    })

    //Raum und alle Nachrichten aus dem Chat aus der Datenbank löschen
    Room.findByIdAndRemove(req.params.roomid, (err, doc)=>{
        if (err) throw err;
        Message.find({toRoom: req.params.roomid}, (err, messages)=> {
            messages.forEach(message=> {
                Message.findByIdAndRemove(message.id, (err, doc)=> {
                    if (err) throw err;
                })
            })
        })
        })
        //Wieder zum ChatIndex zurückkehren, mit Erfolgsnachricht
        req.flash("success_msg", "Raum mitsamt aller dazugehörigen Nachrichten wurde gelöscht");
        res.redirect("/users/chats/view");
})
module.exports = router;