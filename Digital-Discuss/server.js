// Loading necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var clientSessions = require("client-sessions");


// Instantiate express server
var app = express();

// Using modules for app
app.use(express.static(__dirname+'/dist'));
app.use(bodyParser.json()); // Body parser to get the data from ajax calls & form data
app.use(bodyParser.urlencoded()); // Body parser to get the URL GET method data
app.use(clientSessions({
	secret: '0GBlJZ9EKBt2Zbi2flRPvztczCewBxXK' // Secret Key
}));

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    next();
});

// Routes to define the call backs
var routes = {};
routes.user = require('./routes/user.js');
routes.questions = require('./routes/questions.js');
routes.answers = require('./routes/answers.js');
routes.database = require('./database-config/mongodb.js');

// Restful API to get the home page
app.get('/', function(req, res){
	res.sendfile('/dist/index.html');
});

// Restful API to get the home page
app.get('/dashboard', function(req, res){
    res.redirect('/');
});

app.get('/answer', function(req, res){
    res.redirect('/');
});

// Restfull API to login
app.post('/checkLogin', routes.user.login);

// Restful API for user registration
app.post('/register', routes.user.register);

// Restful API for user registration
app.get('/getProfileDetails', routes.user.getProfileDetails);

// Restfull API to logout the user
app.post('/logout', routes.user.logout);

// Restfull API to get the questions list
app.get('/getQuestions', routes.questions.getQuestions);

// Restfull API to get the top questions list
app.get('/getTopQuestions', routes.questions.getTopQuestions);

// Restfull API to get the questions list
app.get('/getTopTags', routes.questions.getTopTags);

// Restfull API to get the my questions list
app.post('/getMyQuestions', routes.questions.getMyQuestions);

// Restfull API to get the users list
app.post('/addQuestion', routes.questions.addQuestion);

// Restfull API to get the users list
app.post('/addAnswer', routes.answers.addAnswer);

// Restfull API to like a answer
app.post('/likeAnswer', routes.answers.likeAnswer);

// Restfull API to like a answer
app.post('/dislikeAnswer', routes.answers.dislikeAnswer);

// Restfull API to get the my questions list
app.post('/getAnswers', routes.answers.getAnswers);

var server = app.listen((process.env.PORT || 3000));
console.log("DigiDiscuss Server is Up running on port 3000");
