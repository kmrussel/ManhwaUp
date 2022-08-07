import * as users from '../models/user-model.mjs';
import express from 'express'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const router = express.Router()


// create a new user
router.post('/register', async (req, res) => {
    if ( !req.body.email || ! req.body.password ){
        return res.status(400)
        .json({'message': 'Username and password are required'});
    };

    // check for duplicate user
    const duplicate = await users.findUser({'email': req.body.email});
    if (duplicate) return res.status(409).json({'duplicate': 'This email is already is use.'}); 

   
    try{
        // encrypt password and set user
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        users.createUser(req.body.username, req.body.email, hashedPwd)
        .then((user) => {
            return res.status(201).json(user);
        });
    } catch(error){
        return res.status(500).json({'message': error.message});
    }
})

// log user in 
router.post('/login', async(req, res) => {
    if ( !req.body.email || !req.body.password) {
        return res.status(400)
        .json({'message' : 'Username and password are required.'})
    };
    
    // find user based on email 
    const foundUser = await users.findUser({'email': req.body.email})
    if (!foundUser) return res.sendStatus(403);
 
    // check if passwords match
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (match){

        // create JWTs 
        const accessToken = jwt.sign(
            { "email": foundUser.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 60 * 10 }
        );

        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
         
        const username = foundUser.username
        // set user's refresh token 
        users.setRefresh(foundUser._id, refreshToken);

        // send cookie and access token      
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 *1000});
        res.status(201).json({username, accessToken});
    } else {
        res.sendStatus(401); 
    };
 
});


export default router; 