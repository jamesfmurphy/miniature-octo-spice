var express = require("express"),
    http = require("http"),
    app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs')
    ;

app.use('/client',  express.static(__dirname + '/client'));
  
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));  

var User = require('./User.js');

function generateHtml(req, res){
    //app.use(express.static(__dirname + "/client"));
	  res.sendFile('client/index.html', {root: __dirname });
	  return res;
}


// create HTTP server/
http.createServer(app).listen(3000);

// set up our routes
app.post("/signup", function (req, res) {
    // User (emailId,password,firstName,lastName,birthDate) 
    var user = new User(req.body.emailId,req.body.password,
                        req.body.firstName,req.body.lastName,
                        new Date(req.body.year,req.body.month,req.body.day));
    res.json(user);
    console.log(user.getInfo());
});
app.get("/", function (req, res) {
    generateHtml(req, res); 
});


console.log("server listening on port 3000");
