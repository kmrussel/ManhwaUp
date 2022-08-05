import * as users from '../models/user-model.mjs';
import express from 'express'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const router = express.Router()


// generate a new refresh token 
router.get('/refresh', async(req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    };
    const refreshToken = cookies.jwt;


    // find user by refresh token
    const foundUser = await users.findUser({'refreshToken': refreshToken});

 
    // user doesn't exist 
    if (!foundUser) {return res.status(403).json({'message': 'user does not exist'});}
    
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