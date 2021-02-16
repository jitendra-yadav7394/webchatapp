var jwt = require('jsonwebtoken');

var options = {
    expiresIn: "365d"
}

module.exports = {
    issueToken: function (payload) {
        var token = jwt.sign(payload, process.env.TOKEN_SECRET || sails.config.globals.jwt_secret, options);
        return token;
    },

    verifyToken: function (token, callback) {
        return jwt.verify(token, process.env.TOKEN_SECRET || sails.config.globals.jwt_secret, {}, callback);
    }
}