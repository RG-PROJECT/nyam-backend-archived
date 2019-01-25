module.exports = function(sha512) {
    const passport = require('passport');
    const User = require('../models/users');
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
        console.log(`[${new Date().toUTCString()}] user logged in: ${user.email} / ${user.name} / ${user._id}`);
        done(null, user._id); // 세션에 id 저장
    });

    passport.deserializeUser(function(userId, done) {
        // DB에서 사용자 데이터 가져오기.
        console.log(`userId: ${userId}`);
        User.findById(userId).exec().then(user => {
            if (!user) {
                done(false, null, { message: 'Can\'t find user data' });
                return;
            }
            done(null, user);
        }).catch(error => {
            done(false, error, { message: 'db error' });
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false
    }, function(email, pw, done) {
        hashedPw = sha512(pw);
        User.findOne({ email:email, pw:hashedPw }).exec()
        .then(user => {
            if (!user) {
                done(null, false, { message: '입력하신 정보를 확인해주세요.' });
                return;
            }
            done(null, user);
        }).catch(error => {
            console.error('Login DB Error ', error);
            done(null, false, { message: 'DB Error' });
        });
    }));

    return passport;
};