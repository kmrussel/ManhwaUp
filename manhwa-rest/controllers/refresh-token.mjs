import * as users from '../models/user-model.mjs';
import express from 'express'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const router = express.Router()

// Citation for the following function
// Date: 08.07.22
// Altered from:
// https://github.com/gitdagray/mongo_async_crud/blob/main/controllers/refreshTokenController.js
// Author: Dave Gray

// generate a new refresh token 
router.get('/refresh', async(req, res) => {
    
    // get cookies
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;

    const foundUser = await users.findUser({'refreshToken': refreshToken});
    if (!foundUser) {
        return res.status(403).json({ 'message': 'user does not exist' });
    }
    
    // evaluate jwt
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) =>{
            if( error || foundUser.email !== decoded.email)return res.sendStatus(403);

            // issue a new access token 
            const accessToken = jwt.sign(
                { 'email': decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 60 * 10 }
            );
            const email = foundUser.email
            return res.status(201).json({ email , accessToken});
    });
});

export default router; 