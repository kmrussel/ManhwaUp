import * as users from '../models/user-model.mjs';
import express from 'express'
import 'dotenv/config';


const router = express.Router()


// log out user
router.post('/user', async (req, res) => {

    const foundUser = await users.findUser({'email': req.body.email})
    if (foundUser[0].email === req.body.email) {
        res.status(201).json(foundUser)
    } else if (foundUser.length === 0 ) {
        res.sendStatus(403);
    } else {
        res.status(400);
    }

});


export default router