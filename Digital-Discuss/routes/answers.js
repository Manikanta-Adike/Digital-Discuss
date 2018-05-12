var db = require('../database-config/mongodb.js');

exports.addAnswer = function (req, res) {
    var data = {};
    console.log(req.body);
    data.username = req.body.username;
    data.like = [];
    data.dislike = [];
    data.description = req.body.description;
    data.questionid = req.body.questionid;

    var answers = new db.answersModel(data);
    answers.save(function (err, success) {
        if (success) {
            console.log(success);
            db.questionsModel.findOne({ _id: data.questionid }, {}, function (qerr, qsuccess) {
                if (qsuccess) {
                    var qdata = qsuccess;
                    qdata["answers"].push(success._id);
                    var questions = new db.questionsModel(qdata);
                    questions.save(function (qserr, qssuccess) {
                        if (qssuccess) {
                            console.log(qssuccess);
                            data.status = 201;
                            res.json(data);
                        }
                        else {
                            console.log("failure", err);
                            data.status = 403;
                            res.json(data);
                        }
                    });
                } else {
                    console.log("failure", err);
                    data.status = 401;
                    res.json(data);
                }
            });
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

exports.likeAnswer = function (req, res) {
    var data = {};
    console.log("body", req.body);
    db.answersModel.findOne({ _id: req.body['_id'] }, {}, function (err, success) {
        if (success) {
            var adata = success;
            var ausername = req.body['username'];
            if (!(adata['like'].indexOf(ausername) > -1)) {
                adata["like"].push(req.body['username']);
                var answers = new db.answersModel(adata);
                answers.save(function (qserr, qssuccess) {
                    if (qssuccess) {
                        console.log(qssuccess);
                        data.message = "User liked it...";
                        data.like = true;
                        data.status = 201;
                        res.json(data);
                    }
                    else {
                        console.log("failure", err);
                        data.status = 403;
                        res.json(data);
                    }
                });
            } else {
                data.message = "User Already liked it...";
                data.like = false;
                res.json(data);
            }
        }
        else {
            console.log(err);
            data.user = {};
            data.status = 403;
            res.json(data);
        }
    });
}

exports.dislikeAnswer = function (req, res) {
    var data = {};
    console.log("body", req.body);
    db.answersModel.findOne({ _id: req.body['_id'] }, {}, function (err, success) {
        if (success) {
            var adata = success;
            var ausername = req.body['username'];
            if (!(adata['dislike'].indexOf(ausername) > -1)) {
                adata["dislike"].push(req.body['username']);
                var answers = new db.answersModel(adata);
                answers.save(function (qserr, qssuccess) {
                    if (qssuccess) {
                        console.log(qssuccess);
                        data.message = "User disliked it...";
                        data.dislike = true;
                        data.status = 201;
                        res.json(data);
                    }
                    else {
                        console.log("failure", err);
                        data.status = 403;
                        res.json(data);
                    }
                });
            } else {
                data.message = "User Already disliked it...";
                data.dislike = false
                res.json(data);
            }
        }
        else {
            console.log(err);
            data.user = {};
            data.status = 403;
            res.json(data);
        }
    });
}