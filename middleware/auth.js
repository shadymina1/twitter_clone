const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes");

const config = process.env;

module.exports = (req, res, next) => {
    const token =  req.headers?.authorization;

    if (!token) {
        return res.status(StatusCodes.FORBIDDEN).send({
            "error" : "token is required !"
        });
    }

    try {
        req.tokenDecode = jwt.verify(token, config.JWT_SECRET);
    } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
            "error" : "invalid token"
        });
    }

    return next();
};
