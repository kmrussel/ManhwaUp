const allowedOrigins = require('../config/allowedOrigins');

// Citation for the following function
// Date: 08.07.22
// Copied from:
// https://github.com/gitdagray/mongo_async_crud/blob/main/middleware/credentials.js
// Author: Dave Gray

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials
