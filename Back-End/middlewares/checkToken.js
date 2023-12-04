const passportJwt = require("../libs/passport-jwt");

// Fungsi middleware untuk autentikasi dengan Passport JWT
function checkToken(req, res, next) {
    passportJwt.authenticate('jwt', { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(401).json({ message: 'Unauthorized', error: info ? info.message : 'Token tidak valid' });
        }
        req.user = user; // Menambahkan data user ke request
        next();
    })(req, res, next);
}

module.exports = checkToken;
