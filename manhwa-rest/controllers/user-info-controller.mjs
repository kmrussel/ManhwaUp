import * as users from '../models/user-model.mjs';
import express from 'express'
import 'dotenv/config';


const router = express.Router()


// find user by email
router.post('/user', async (req, res) => {

    const foundUser = await users.findUser({ 'email': req.body.email })
    if (foundUser.email === req.body.email) {
        res.status(201).json(foundUser);
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
        res.status(201).json(readingList);
    } else if (!foundUser) {
        res.sendStatus(403);
    } else {
        res.status(400);
    }

})

// check if manhwa is in reading list 
router.post('/check-list', async (req, res) => {

    const foundUser = await users.findUser({ 'email': req.body.email })
    const userID = foundUser._id
    users.findManhwa(userID, req.body.manhwa)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => {
            console.log(error);
            res.sendStatus(404)
        })
            
})    



export default router