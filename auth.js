const jwtSecret = 'your_jwt_secret'; //This has to be the same key used in JWTStrategy
const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport'); //Local passport file

let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, //This is the username being encoded in JWT
        expiresIn: '7d', //This specifies that the token will expire in 7 days
        algorithm: 'HS256' //This is the algorithm used to sign ot encode the values of JWT
    });
}

/*Post login*/
module.exports = (router) => {
    router.post('/login', (req,res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user: user, token:token });
            });
        })(req,res);
    });
}