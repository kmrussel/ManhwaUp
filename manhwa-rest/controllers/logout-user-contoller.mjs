import * as users from '../models/user-model.mjs';
import express from 'express'
import 'dotenv/config';


const router = express.Router()

// log out user
router.get('/logout', async (req, res) => {
    // on client, delete access token 

    const cookies = req.cookies; 
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    // check if refresh token is stored
        const foundUser = await users.findUser({'refreshToken': refreshToken})

 
    // user does not exist
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None',});
        return res.sendStatus(206);
    };

    // delete refresh token from user  
    users.setRefresh(foundUser._id, []);
    
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None',});
    res.sendStatus(204);

});

export default router