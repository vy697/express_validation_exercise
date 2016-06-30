'use strict';

var express = require('express');
var router = express.Router();

// Write your form and validations inside this route file.


// Add form validations in /signup for:
// Password: Required. Must be more than 8 characters with atleast One letter, one number, and one special character (!?/.,')
// Email: Required. Must be formatted like an email, (something @ something . something)
// First Name: Required.
// Last Name: Required.
// Phone Number: Required. Must be a 10 digit number formatted like: 999-888-9898
//
// STRETCH: Hook up a database that you insert these values into after you've validated them.
// REMINDER: Don't store passwords in plain text.. Make sure you hash it first!

router.get('/', function(req, res) {
    // Handle initial rendering here.
    res.render('signup', {
        hasError: false,
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: ''
    });
});

router.post('/', function(req, res) {
    // Handle rendering / redirecting here.
    console.log(req.body);
    // If there arent any validation errors, redirect to '/'

    var info = {
        hasError: false,
        username: req.body.username,
        password: req.body.password
    };

// if (info.hasError === true) {

        info.error = {};
        checkPost(req, info);
        // If there are validation errors, re-render the signup page, injecting the users previous inputs.
        res.render('signup', info);

    // } else {
    //
    //     res.send('Congrats, you\'re signed up');
    //
    // }

});

// PRO-TIP: Write ALOT of functions to help you handle each little piece.

//check all requirements with one function calling all functions
function checkPost(req, info) {
    //username check
    checkUserName(info, req);
    checkRequired(info, req);
    // checkPassWord(info, req);

    // return info;
}

//checking everything is filled out
function checkRequired(info, req) {

    for (var item in req.body) {
        info[item] = req.body[item];
        if (req.body[item].length <= 0) {
            if (!info.error[item]) {
                info.error[item] = [];
            }
            info.hasError = true;
            info.error[item].push({
                message: item + ' is required.'
            });
        }
    }

}

// Username: Required. Must be more than 6 characters, must start with a letter, and no punctuation.
function checkUserName(info, req) {
    //set object's username to incoming username
    console.log(info);
    info.username = req.body.username;

    if (!info.error.username) {
        info.error.username = [];
    }

    //if username less than equal to six
    if (req.body.username.length <= 6) {
        info.hasError = true;
        info.error.username.push({
            message: "Username is too short"
        });
    }
    if (req.body.username) {
        var regex = /[A-Za-z]/;
        if (!req.body.username[0].match(regex)) {
            info.hasError = true;
            info.error.username.push({
                message: "Username should start with a letter"
            });
        }
        var regex = /\W/g;
        if (req.body.username.match(regex)) {
            info.hasError = true;
            info.error.username.push({
                message: "Username can't contain punctuation"
            });
        }
    }
}

//TODO: one number, and one special character (!?/.,')
function checkPassWord(info, req) {
    info.password = req.body.password;

    if (!info.error.password) {
        info.error.password = [];
    }
    //Must be more than 8 characters
    if (req.body.password.length < 8) {
        info.hasError = true;
        info.error.password.push({
          message: "Password has to be more than 8 characters"
        });
    }
    // //atleast One letter
    // var regex = /\W/g;
    // if (!req.body.password.match(regex)) {
    //   info.hasError
    // }


}

// var info = {
//   username: req.body.username,
//   email: req.body.email,
//   hasError: false,
//   error: {
//     username:['username error msgs'],
//     email:[],
//     password: []
//   }
// }









module.exports = router;
