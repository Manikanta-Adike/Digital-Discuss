var mongoose = require('mongoose');
var mongodbURL = 'mongodb://digidiscuss:digi123@ds031952.mlab.com:31952/digital-discuss';
var mongodbOptions = {};
mongoose.Promise = require('bluebird');

// MongoDB connection
mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) {
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});

// Instantiate Schema
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

// User schema
var User = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    seatLocation: { type: String, required: true },
    designation: { type: String, required: true },
    level: { type: String, required: true },
    tag: { type: Array },
    questions: { type: Array }
});

//Questions Schema
var Questions = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: Array },
    answers: { type: Array },
    username: { type: String, required: true }
});

//Answers Schema
var Answers = new Schema({
    questionid: { type: String, required: true },
    username: { type: String, required: true },
    like: { type: Number, required: true },
    dislike: { type: Number, required: true },
    description: { type: String, required: true },
});

// Define Models
var userModel = mongoose.model('User', User);
var questionsModel = mongoose.model('Questions', Questions);
var answersModel = mongoose.model('Answers', Answers);

// Export Models
exports.userModel = userModel;
exports.questionsModel = questionsModel;
exports.answersModel = answersModel;
