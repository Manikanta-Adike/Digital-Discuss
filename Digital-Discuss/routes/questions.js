var db = require('../database-config/mongodb.js');

exports.addQuestion = function (req, res) {
    var data = {};
    console.log(req.body);
    var questions = new db.questionsModel(req.body);
    questions.save(function (err, success) {
        if (success) {
            console.log(success);
            data.status = 201;
            res.json(data);
        }
        else {
            console.log("failure", err);
            data.status = 403;
            res.json(data);
        }
    });
};

exports.getQuestions = function (req, res) {
    var data = {};
    db.questionsModel.find({}, {}, function (err, success) {
        if (success) {
            console.log(success);
            data.questions = success;
            data.status = 201;
            res.json(data);
        } else {
            console.log("failure", err);
            data.status = 401;
            res.json(data);
        }
    }).sort({ _id: -1 });
};

exports.getMyQuestions = function (req, res) {
    var data = {};
    console.log(req.body);
    db.questionsModel.find({ username: req.body.username }, { _id: 0 }, function (err, success) {
        if (success) {
            console.log(success);
            data.questions = success;
            data.status = 201;
            res.json(data);
        } else {
            console.log("failure", err);
            data.status = 401;
            res.json(data);
        }
    }).sort({ _id: -1 });
};

exports.getTopQuestions = function (req, res) {
    var data = {};
    db.questionsModel.aggregate([{ "$project": { "length": { "$size": "$answers" }, "title": 1, "description": 1, "username": 1 } }, { "$sort": { "length": -1 } }], function (err, success) {
        if (success) {
            data.questions = success;
            data.status = 201;
            res.json(data);
        } else {
            data.status = 401;
            res.json(data);
        }
    })
}