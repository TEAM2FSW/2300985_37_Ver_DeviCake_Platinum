const passport = require("passport");
const passportJwt = passport;

const { Strategy : JwtStrategy, ExtractJwt } = require("passport-jwt");

const { User } = require("../models");

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRETTOKEN
}

passportJwt.use(new JwtStrategy(options, async (payload, done) => {
    User.findByPk(payload.user_id)  
        .then(user => done(null, user))
        .catch(err => done(err, false));
}))

module.exports = passportJwt;