var express = require("express"),
    http = require("http"),
    app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    session = require('express-session'),
    cookieParser = require('cookie-parser')
    ,mongoose = require('mongoose')
    ,MongoStore = require('connect-mongo')(session)
    ;

    
session = require('express-session'),
    cookieParser = require('cookie-parser')
    app.use(cookieParser());
app.use(session({secret: '473'})); 

app.use(session({
    store: new MongoStore({ url: 'mongodb://localhost/test' })
}));

app.use('/public',  express.static(__dirname + '/public'));
  
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));  

var loginUser =[];
var User = require('./User.js');
mongoose.connect('mongodb://localhost/miniature-octo-spice');
var db = mongoose.connection;
 
db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected.');
});

var UserSchema = mongoose.Schema({
    emailId:String,
    password:String,
    firstName:String,
    lastName:String,
    gender:String,
    birthDate:Date,
    friends : [],
    movies : [],
    books : [],
    shows : [],
    games : []
});
var UserModel = mongoose.model("Users",UserSchema);

// create HTTP server/
http.createServer(app).listen(3000);

app.post('/getLoginUser.json',function (req, res) {
        //must be change to session 
        console.log('req.session.currentUser:'+req.session.currentUser);
        if(req.session.currentUser) {
            res.json(JSON.stringify(req.session.currentUser));
        }
        else res.json('{}');
    });

// set up our routes
app.post("/signup", function (req, res) {
    // User (emailId,password,firstName,lastName,birthDate) 
    var user = new User(req.body.emailId,req.body.password,
                        req.body.firstName,req.body.lastName,req.body.radiobutton,
                        new Date(req.body.b_year,req.body.b_month,req.body.b_day));
    console.log(req.body.emailId+' '+req.body.password+' '+
                        req.body.firstName+' '+req.body.lastName+' '+req.body.radiobutton+' '+
                        new Date(req.body.b_year,req.body.b_month,req.body.b_day));
    console.log("user before save:"+JSON.stringify(user));
    //before create new user, we must check he is not there
    UserModel.find({ 
               'emailId': req.body.emailId, 
                }, 
                function (err, users) {
                    if(err != null){
                        console.log('ERROR:'+err);
                        return;
                    }
                    var result = {"status":"","message":""};
                    console.log(users);
                    if(users.length >0){
                        req.session.currentUser = users[0];
                        loginUser.push(users[0]);
                        console.log(users[0])    ;
                        result.status = "fail";
                        result.message = "user allerady signup";
                        res.json(JSON.stringify(result));
                    }
                    else{
                        console.log('new user');
                        // create new acount
                        var userModel = new UserModel(user);
                        userModel.save(function(err){
                                if(err !== null){
                                    console.log(err);
                                }else{
                                    console.log("the user was saved");
                                }
                        });
                        req.session.currentUser = user;
                        loginUser.push(user);
                        console.log(user.getInfo());
                        result.status = "success";
                        result.message = "signup successful";    
                        res.json(JSON.stringify(result));
                    }
                        
                }
        );
});

app.post("/updateMovie", function (req, res) {

});

app.post("/login", function (req, res) {
    // User (emailId,password,firstName,lastName,birthDate) 
    console.log('email:'+req.body.emailId);
    console.log('password:'+req.body.password);
    if (req.body.emailId) {
       // var user = new User(req.body.emailId,req.body.password,
         //               null,null,null,null);
        //var userModel = new UserModel(user);
        UserModel.find({ 
                        'emailId': req.body.emailId, 
                       'password': req.body.password
                        }, 
                        function (err, users) {
                            if(err != null){
                                console.log('ERROR:'+err);
                                return;
                            }
                            var result = {"status":"","message":"", "redirect":""};
                            console.log(users);
                            if(users.length >0){
                                req.session.currentUser = users[0];
                                loginUser.push(users[0]);
                                console.log(users[0])    ;
                                result.status = "success";
                                result.message = "authenticated";
                                result.redirect = "/profile.show"
                                res.json(JSON.stringify(result));
                            }
                            else{
                                console.log('not authenticate');
                                result.status = "fail";
                                result.message = " not authenticated";    
                                res.json(JSON.stringify(result));
                            }
                                
                        }
        );
    }
});
app.get("/login.show",function(req,res){
    delete req.session.currentUser;
    res.sendFile('public/login.html', {root: __dirname });
});
app.get("/logout",function(req,res){
    console.log('loginUser before logout:'+loginUser)
    for(var i = loginUser.length - 1; i >= 0; i--) {
        if(loginUser[i].emailId === req.session.currentUser.emailId) {
           loginUser.splice(i, 1);
       }
    }
    console.log('loginUser after logout:'+loginUser)
    delete req.session.currentUser;
    res.sendFile('public/indexMain.html', {root: __dirname });
});

app.post("/profile.show", function (req, res) {
    console.log('in post /profile.show');
    res.sendFile('public/profile.html', {root: __dirname });
});
app.get("/profile.show", function (req, res) {
    console.log('in post /profile.show');
    res.sendFile('public/profile.html', {root: __dirname });
});
app.post("/signup.show", function (req, res) {
    console.log('in post /signup.show');
    res.sendFile('public/signup.html', {root: __dirname });
});

app.get("/signup.show", function (req, res) {
    console.log('in get /signup.show');
    res.sendFile('public/signup.html', {root: __dirname });
});
app.get("/", function (req, res) {
    res.sendFile('public/indexMain.html', {root: __dirname });
});
app.post("/search", function (req, res) {
    console.log('queryString:'+req.body.queryString);
    if (req.body.queryString) {
        var regex = new RegExp(req.body.queryString, "i");
       console.log('regex:'+regex);
       UserModel.find({$or: [
                {'firstName': regex}, 
                {'lastName': regex}
            ]}, 
            function (err, users) {
                if(err != null){
                    console.log('ERROR:'+err);
                    return;
                }
                console.log(users);
                res.json(JSON.stringify(users));
            }
        );
    }
});

app.post("/getLoginUserList", function (req, res) {
    res.json(JSON.stringify(loginUser));
});
console.log("server listening on port 3000");
