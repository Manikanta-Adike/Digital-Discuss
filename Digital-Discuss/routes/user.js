var db = require('../database-config/mongodb.js');

exports.register = function (req, res) {
    var data = {};
    console.log(req.body);
    var user = new db.userModel(req.body);
    user.save(function (err, success) {
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

exports.login = function (req, res) {
    var data = {};
    console.log("body", req.body);
    db.userModel.findOne(req.body, function (err, success) {
        if (success) {
            console.log(success);
            req.session_state.username = success.username;
            data.status = 201;
            success.password = undefined;
            success.security = undefined;
            data.user = success;
            res.json(data);
        }
        else {
            console.log(err);
            data.user = {};
            data.status = 403;
            res.json(data);
        }
    });
};

exports.logout = function (req, res) {
    var data = {};
    if (req.session_state.username) {
        console.log(req.session_state.username);
        req.session_state.reset();
        data.status = 201;
        res.json(data);
    }
    else {
        console.log(err);
        data.status = 401;
        res.json(data);
    }
};

exports.getProfileDetails = function (req, res) {
    var data = {};
    console.log(req.body);
    db.answersModel.find({}, { _id: 0 }, function (err, success) {
        if (success) {
            console.log(success);
            data.answers = success;
            data.status = 201;
            res.json(prepareProfileData(data.answers));
        } else {
            console.log("failure", err);
            data.status = 401;
            res.json(data);
        }
    }).sort({ _id: -1 });
}

function prepareProfileData(data) {
    var user = {};
    for (var i = 0; i < data.length; i++) {
        if(!user[data[i].username]) {
            user[data[i].username] = {};
            user[data[i].username].answers = [];
            user[data[i].username]["answers"].push(data[i]);
            user[data[i].username].like = data[i]["like"].length;
            user[data[i].username].dislike = data[i]["dislike"].length;
        } else {
            user[data[i].username]["answers"].push(data[i]);
            user[data[i].username].like = user[data[i].username].like + data[i]["like"].length;
            user[data[i].username].dislike = user[data[i].username].dislike + data[i]["dislike"].length;
        }
    }

    return user;
}