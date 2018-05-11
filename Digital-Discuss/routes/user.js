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
    console.log("body",req.body);
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