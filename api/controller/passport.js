module.exports = function({dbController, sha512}) {
    const passport = require('passport');

    const LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(user, done) {
        console.log('[' + new Date().toUTCString() + '] user logged in: ' + user.email + ' / ' + user.username);
        done(null, user.id); // 세션에 id 저장
    });

    passport.deserializeUser(function(userId, done) {
        // DB에서 사용자 데이터 가져오기.

        // dbController.selectUserByIdx(idx).then(function(result) {
        //     if (result.length > 0) {
        //         done(null, result[0]);
        //     }else {
        //         done(false, null, { message: 'Can\'t find user data' });
        //     }
        // }).catch(function(error) {
        //     done(false, error, { message: 'db error' });
        // });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false
    }, function(email, pw, done) {
        pw = sha512(pw);
    }));

    return passport;
};