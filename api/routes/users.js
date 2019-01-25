module.exports = function(sha512, passport) {
    const express = require('express');
    const router = express.Router();
    const mongoose = require('mongoose');
    const User = require('../models/users');

    const EMAIL_PATTERN = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // const ALPHANUM_PATTERN = new RegExp(/^[a-z0-9]+$/i);

    router.post('/login', (req, res, next) => {
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            const error = new Error("Already logged in");
            error.status = 402;
            next(error);
            return;
        }

        const responseError = (status, msg) => {
            const error = new Error(msg);
            error.status = status;
            next(error);
        }

        // validation check
        if (typeof req.body.email === 'undefined' ||  typeof req.body.pw === 'undefined') {
            responseError(403, "Missing parameter");
            return;
        }

        if (!EMAIL_PATTERN.test(req.body.email)) {
            responseError(403, "이메일 주소가 형식에 어긋납니다. 확인해주세요.");
            return;
        }
        passport.authenticate('local', function(error, user, info) {
            if (error) {
                console.error(error);
                responseError(500, "Error occurred")
                return;
            }
            if (!user) {
                const msg = (typeof info.message !== 'undefined')?info.message:"Something went wrong, please try again.";
                responseError(403, msg);
                return;
            }
            req.logIn(user, function(error) {
                if (error) {
                    console.error(error);
                    responseError(403, error);
                    return;
                }
                res.status(200).json({message: 'OK'});
                return;
            });
        })(req, res, next);
    });

    router.post('/logout', (req, res, next) => {
        if (req.isAuthenticated()) {
            req.logout();
        }
        res.status(200).json({message: 'OK'});
    });

    router.post('/register', (req, res, next) => {
        // TODO: referer check
        if (req.isAuthenticated()) {
            const error = new Error("Already logged in");
            error.status = 402;
            next(error);
            return;
        }

        const responseError = (status, msg) => {
            const error = new Error(msg);
            error.status = status;
            next(error);
        }

        // validation check
        if (typeof req.body.email === 'undefined' ||  typeof req.body.pw === 'undefined' || typeof req.body.name === 'undefined') {
            responseError(403, "Missing parameter");
            return;
        }

        const userData = {
            email : req.body.email,
            pw : req.body.pw,
            name : req.body.name
        }

        if (!EMAIL_PATTERN.test(userData.email)) {
            responseError(403, "Invalid email format");
            return;
        }
        if (userData.pw.length < 6 || userData.pw.length >= 32) {
            responseError(403, "비밀번호는 6글자 이상, 32글자 미만으로 작성해주세요.");
            return;
        }

        if (userData.name.length < 2 || userData.name.length >= 12) {
            responseError(403, "이름은 2글자 이상, 12글자 미만으로 작성해주세요.");
            return;
        }
        // TODO: 이름에 공백(or 공백특문) 이 들어갈 수 없게 처리.
        const user = new User({
            email: userData.email,
            name: userData.name,
            pw: sha512(userData.pw)
        });
        user.save(function (err, user) {
            console.log(user);
            if (err) {
                console.error(err);
                responseError(500, "Database error occurred")
                return;
            }
            res.status(200).send('OK');
        });
        
    });


    return router;
}