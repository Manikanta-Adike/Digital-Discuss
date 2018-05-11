var db = require('../database-config/mongodb.js');

exports.addAnswer = function (req, res) {
    var data = {};
    console.log(req.body);
    data.username = req.body.username;
    data.like = 0;
    data.description = req.body.description;
    data.questionid = req.body.questionid;

    var answers = new db.answersModel(data);
    answers.save(function (err, success) {
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

exports.getAnswers = function (req, res) {
    var data = {};
    console.log(req.body);
    db.answersModel.find({ questionid: req.body._id }, { _id: 0 }, function (err, success) {
        if (success) {
            console.log(success);
            data.answers = success;
            data.status = 201;
            res.json(data);
        } else {
            console.log("failure", err);
            data.status = 401;
            res.json(data);
        }
    }).sort({ _id: -1 });
};