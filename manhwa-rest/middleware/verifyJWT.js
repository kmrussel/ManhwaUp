const jwt = require('jsonwebtoken');
require('dotenv').config();


// JWT Authentication | Node JS and Express tutorials 20:00
const verifyJWT = (res, req, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader)
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token, process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if (error) return res.sendStatus(403); // invalid token
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verifyJWT