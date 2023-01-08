const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Article = require("../models/articles");
const { where } = require("../models/user");
const User = require("../models/user");
const Comment = require("../models/comment");
const db = require("../config/keys").MongoURI;



//Welcome Page
router.get('/', (req,res) => res.render("welcome.ejs"));

//Dashboard
router.get("/dashboard", ensureAuthenticated,(req, res) => {
    var options = {
        mode: 'text',
        args: [1, 3, 1]
    };
    module.exports = options;
      let allUsers = [];
User.find({Rang: "User"}, (err, user)=>{
    user.forEach(person => {
        allUsers.push(person.name)
    })
})
 
     

   Article.find({Status: "public"}, function (err, articles){
    let allTitles = [];
       articles.forEach(article => {
           allTitles.push(article.id+article.title)
       })

       
    //console.log(articles.length)
    articles.splice(0, articles.length-20)
    //console.log("2. Test: "+ articles.length)
    

            res.render("dashboard", {
                name: req.user.name,
                newMessages: req.user.newMessanges,
                articlesList: articles,
                articlesGList: [],
                userList: [allUsers],
                titleList: [allTitles]
            });
       // console.log(allUsers);
   })
}); 

//Zufällige Geschichte rendern
router.get("/history/random", (req, res)=>{
    Article.find({Status: "public"}, (err, articles) =>{
       if (articles){
        var random = Math.floor(Math.random()* articles.length);
        if (random==0){
            random = 1;
        }
         var randomArticle = articles.find((el, idx)=> idx == random-1);
         res.redirect("/history/"+randomArticle.id);
       }else{
        res.redirect("/dashboard")
       }
    })
})
   



//Dashboard + Genre
router.get("/dashboard/:genre", ensureAuthenticated,(req, res) => {
    Article.find({Status: "public"}, function (err, articles){
        let allUsers = [];
        User.find({Rang: "User"}, (err, user)=>{
            user.forEach(person => {
                allUsers.push(person.name)
            })
        })

        
        let allTitles = [];
        articles.forEach(article => {
            allTitles.push(article.id+article.title)
        })

         Article.find({genre: req.params.genre}, (err, articlesGenre) => {
            if (req.params.genre == "keine Angabe"){
                res.redirect("/dashboard")
            } else{
                //console.log(req.user.newMessanges.length);
                res.render("dashboard", {
                    name: req.user.name,
                    newMessages: req.user.newMessanges,
                    articlesList: [],
                    articlesGList: articlesGenre,
                    userList: [allUsers],
                    titleList: [allTitles]
                });
            }
         })
    })
 });
// Bestimmte Geschichte vollständig anzeigen lassen
router.get("/history/:id", ensureAuthenticated, (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        Comment.find({toArticle: req.params.id}, (err, comment)=>{
                res.render("history", {
                    title: article.title,
                    author: article.author,
                    article_authorID: article.authorID,
                    content: article.content,
                    date: article.publishmentDate,
                    article_id: article._id,
                    commentList: comment,
                    user: req.user.id,
                    likes: article.likers,
                    Clikes: comment.likers
                })
            }
        )
    })
})

//Geschichte veröffentlichen
router.post("/:id/publish", (req, res) => {
    Article.findByIdAndUpdate(req.params.id, {Status: "public", publishmentDate: Date.now()}, (err, doc)=> {
        if (err) throw err;
        req.flash("success_msg", "Artikel wurde veröffentlicht!")
        res.redirect("/users/personalCollection");
    });
});

//Geschichte bearbeiten Handle
router.get("/:id/edit", ensureAuthenticated, (req, res)=> {
    Article.findById(req.params.id, (err, article) => {
        if (req.user.id == article.authorID){
            res.render("editEntrys", {
                title: article.title,
                author: article.author,
                content: article.content,
                summary: article.summary,
                date: article.publishmentDate,
                id: article.id,
                genre: article.genre
            })
        }else{
            req.flash("error_msg", "Sie haben nicht die nötige Berechtigung hierfür!");
            res.redirect("/users/create");
        }
    })
   
})

//Änderungen an der Geschichte speichern
router.post("/:id/edit", (req, res)=>{
    const { title, summary, content, genre} = req.body;
    let errors = [];
    Article.findByIdAndUpdate(req.params.id, {title: title, summary: summary, content: content, genre: genre}, (err, doc)=> {
        if (err) throw err;
        req.flash("success_msg", "Erfolgreich geupdatet...")
    res.redirect("/users/personalCollection");
    })
    
});

//Geschichte löschen
router.get("/article/:id/delete", ensureAuthenticated, (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (req.user.id == article.authorID || req.user.Rang == "Admin"){
           //Alle Kommentare des Artikels löschen
            Comment.find({toArticle: req.params.id}, (err, comments)=>{
               comments.forEach(comment=>{
                   Comment.findByIdAndDelete(comment.id, (err, doc)=>{
                       if (err) throw err;
                   })
               })
           })

           //Artikel löschen
           Article.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err) throw err;
            req.flash("success_msg","Artikel erfolgreich gelöscht");
            res.redirect("/users/personalCollection");
        })
        } else {
            req.flash("error_msg", "Sie haben keine Berechtigung hierfür");
            res.redirect("/users/personalCollection");
        }
    })
});

//Kommentar löschen
router.get("/comment/:id/delete", ensureAuthenticated,(req, res) =>{
    Comment.findById(req.params.id, (err, comment)=>{
        if (req.user.id == comment.CauthorID || req.user.Rang == "Admin"){
            Article.findById(comment.toArticle, (err, article)=> {
                Comment.findByIdAndDelete(req.params.id, (err, doc)=> {
                    if (err) throw err;
                    req.flash("success_msg", "Kommentar erfolgreich gelöscht");
                    res.redirect("/history/"+article._id);
                    return
                })
            })
        }else {
            Article.findById(comment.toArticle, (err, article)=>{
                req.flash("error_msg", "Sie sind nicht der Autor dieses Eintrags");
                res.redirect("/history/"+article._id);
            })
        }
    })
})

//Fremdes Profil anzeigen
router.get("/profile/:name", (req, res) => {
    User.findOne({name: req.params.name}, (err, user) =>{
        Article.find({Status: "public", authorID: user.id}, (err, articles)=> {
            res.render("profileAll", {
                name: user.name,
                date: user.date,
                id: user.id,
                ArticleList: articles
            })
        })
    })
})

// Kommentar unter Geschichte posten
router.post("/:id/postComment", ensureAuthenticated,(req, res) =>{
    const {CommentContent} = req.body;
    const toArticle = req.params.id;
    const Cauthor = req.user.name;
    const CauthorID = req.user.id;
    let errors = [];
    if(!CommentContent){
        errors.push({msg: "Man kann keine Inhaltslosen Kommentare veröffentlichen"});
            res.render("dashboard");
    }else {
        const newComment = new Comment({
            Cauthor,
            toArticle,
            CommentContent,
            CauthorID
        })
        newComment.save();
        res.redirect("/history/"+req.params.id)
    }
})

//Geschichte Liken
router.get("/likePost/:id", ensureAuthenticated, (req, res)=> {
    Article.findById(req.params.id, (err, article)=> {
        Article.findByIdAndUpdate(req.params.id,
             {$addToSet: {likers: req.user.id}}, (err, doc)=> {
            res.redirect("/history/"+req.params.id);
        })
    })
});

//Kommentar liken
router.get("/likeComment/:id/:cid", ensureAuthenticated, (req, res) => {
    Comment.findByIdAndUpdate(req.params.cid, {$addToSet: {likers: req.user.id}}, (err, doc)=>{
        if (err) throw err;
        res.redirect("/history/"+req.params.id)
    })
});

//Geschichte wieder entliken
router.get("/unlikePost/:id", ensureAuthenticated, (req, res) =>{
    Article.findByIdAndUpdate(req.params.id, {$pull: {likers: req.user.id}}, (err, doc)=>{
        if (err) throw err;
        res.redirect("/history/"+req.params.id)
    })
});

//Kommentar wieder entliken
router.get("/unlikeComment/:id/:cid", ensureAuthenticated, (req, res) => {
    Comment.findByIdAndUpdate(req.params.cid, {$pull: {likers: req.user.id}}, (err, doc)=>{
        if (err) throw err;
        res.redirect("/history/"+req.params.id)
    })
});

// Admin Area
router.get("/AdminArea", ensureAuthenticated,(req, res)=> {
    if (req.user.Rang == "Admin"){
        User.find({Rang: "Admin"}, (err, admins)=>{
          Article.find({reported: "true"}, (err, reportedA)=>{
              Comment.find({reported: "true"}, (err, reportedC)=>{
                res.render("AdminIndex", {
                    AdminList: admins,
                    ReportedArticles: reportedA,
                    ReportedComments: reportedC
                })
              })
          })
        })
    } else {
        res.send("<h1>You are not allowed to view this resource</h1><a href='/users/login'>ok</a>")
    }
})

//Neue Admins hinzufügen
router.post("/AdminIndex", (req, res)=> {
    let errors = [];
    const {newAdmin} = req.body;
    User.findOne({name: newAdmin})
    .then(user => {
        if (user){
           if (user.Rang == "Admin"){
               errors.push({msg: "Dieser Benutzer ist bereits ein Admin!"});
               User.find({Rang: "Admin"}, (err, admins)=>{
                Article.find({reported: "true"}, (err, reportedA)=>{
                    Comment.find({reported: "true"}, (err, reportedC)=>{
                      res.render("AdminIndex", {
                          errors,
                          AdminList: admins,
                          ReportedArticles: reportedA,
                          ReportedComments: reportedC
                      })
                    })
                })
            })
        } else {
            User.findOneAndUpdate({name: newAdmin}, {Rang: "Admin"}, (err, doc) =>{
                if (err) throw err;
                req.flash("success_msg", newAdmin + " ist nun ein Admin");
                res.redirect("/AdminArea")
            })
           }
        } else {
            errors.push({msg: "Es gibt keinen Benutzer mit diesem Benutzernamen"});
            User.find({Rang: "Admin"}, (err, admins)=>{
                Article.find({reported: "true"}, (err, reportedA)=>{
                    Comment.find({reported: "true"}, (err, reportedC)=>{
                      res.render("AdminIndex", {
                          errors,
                          AdminList: admins,
                          ReportedArticles: reportedA,
                          ReportedComments: reportedC
                      })
                    })
                })
            })
        }
    })
})

//Artikel reporten
router.get("/reportArticle/:id", (req, res)=> {
   Article.findByIdAndUpdate(req.params.id, {reported: "true"}, (err, doc)=>{
    req.flash("success_msg", "Artikel wurde gemeldet");
    res.redirect("/history/"+req.params.id);
   })
})

//Artikel dereporten
router.get("/deReport/Article/:id", (req, res)=> {
    Article.findByIdAndUpdate(req.params.id, {reported: "false"},(err, doc)=>{
        req.flash("success_msg", "Änderung erfolgreich durchgeführt");
        res.redirect("/AdminArea")
    })
})

//Kommentare reporten
router.get("/:aID/reportComment/:id", (req, res)=> {
   Comment.findByIdAndUpdate(req.params.id, {reported: "true"}, (err, doc)=>{
    req.flash("success_msg", "Kommentar wurde gemeldet");
    res.redirect("/history/"+req.params.aID);
   })
})

//Kommentare dereporten
router.get("/deReport/Comment/:id", (req, res)=>{
    Comment.findByIdAndUpdate(req.params.id, {reported: "false"}, (err, doc)=>{
        req.flash("success_msg", "Änderung erfolgreich durchgeführt");
        res.redirect("/AdminArea")
    })
})

//Admin View auf Artikel
router.get("/Admin/history/:id", ensureAuthenticated, (req, res)=>{
    if (req.user.Rang == "Admin"){
        Article.findById(req.params.id, (err, article) => {
            Comment.find({toArticle: req.params.id}, (err, comment)=>{
                        res.render("AdminView", {
                            title: article.title,
                            author: article.author,
                            article_authorID: article.authorID,
                            content: article.content,
                            date: article.publishmentDate,
                            article_id: article._id,
                            commentList: comment,
                            user: req.user.id,
                            likes: article.likers,
                            Clikes: comment.likers
                   })
                }
            )
        })
    } else {
            req.flash("error_msg", "Sie haben nicht die nötigen Berechtigungen um auf diese Resourse zuzugreifen. Melden Sie sich erneut an");
            res.redirect("/users/login");
    }
})

//Admin: Geschichte löschen
router.get("/Admin/article/:id/delete", ensureAuthenticated, (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (req.user.id == article.authorID || req.user.Rang == "Admin"){
           //Alle Kommentare des Artikels löschen
            Comment.find({toArticle: req.params.id}, (err, comments)=>{
               comments.forEach(comment=>{
                   Comment.findByIdAndDelete(comment.id, (err, doc)=>{
                       if (err) throw err;
                   })
               })
           })

           //Artikel löschen
           Article.findByIdAndDelete(req.params.id, (err, doc) => {
            if (err) throw err;
            req.flash("success_msg","Artikel erfolgreich gelöscht");
            res.redirect("/AdminArea");
        })
        } else {
            req.flash("error_msg", "Sie haben keine Berechtigung hierfür");
            res.redirect("/users/personalCollection");
        }
    })
});

//Admin: Kommentar löschen
router.get("/Admin/comment/:id/delete", (req, res)=>{
    Comment.findByIdAndDelete(req.params.id, (err, doc)=>{
        if (err) throw err;
        req.flash("success_msg", "Kommentar erfolgreich gelöscht");
        res.redirect("/AdminArea");
    })
})
module.exports = router;