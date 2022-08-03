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
    if (foundUser.length === 0) {return res.status(403).json({'message': 'user does not exist'});}
    
    // evaluate jwt
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) =>{
            if( error || foundUser.username !== decoded.username)return res.sendStatus(403);

            // issue a new access token 
            const accessToken = jwt.sign(
                { 'username': decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            );
            
            return res.status(201).json({accessToken});
    });
});

export default router; 