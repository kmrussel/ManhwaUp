import * as users from '../models/user-model.mjs';
import express from 'express'
import 'dotenv/config';


const router = express.Router()


// find user by email
router.post('/user', async (req, res) => {

    const foundUser = await users.findUser({ 'email': req.body.email })
    if (foundUser.email === req.body.email) {
        res.status(201).json(foundUser)
    } else if (!foundUser) {
        res.sendStatus(403);
    } else {
        res.status(400);
    }

});

// find user's reading list by email 
router.post('/reading-list', async (req, res) => {

    const foundUser = await users.findUser({ 'email': req.body.email })
    const readingList = foundUser.readingList 
    if (foundUser) {
        res.status(201).json(readingList)
    } else if (!foundUser) {
        res.sendStatus(403);
    } else {
        res.status(400);
    }

})
export default router