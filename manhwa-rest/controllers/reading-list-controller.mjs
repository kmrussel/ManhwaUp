import * as users from '../models/user-model.mjs';
import express from 'express';

const router = express.Router()


// add manhwa to reading list
router.post('/reading-list/add', async (req, res) => {
    const foundManhwa = await users.findManhwa(req.body.user, req.body.manhwa)
    
    if (foundManhwa) {
        return res.sendStatus(403)
    }

    users.updateList(req.body.user, {$push : {readingList : req.body.manhwa}})
        .then(result => {
            res.status(201).json({modifiedCount: result.modifiedCount})
        })
        .catch(error => {
            console.error(error);
            res.status(401).json({Error: 'Unable to Update Reading List'})
    })
})

// remove manhwa from reading list 
router.post('/reading-list/remove', async (req, res) => {
    users.updateList(req.body.user, {$pull : {readingList : req.body.manhwa}})
        .then(result => {
            res.status(201).json({modifiedCount: result.modifiedCount})
        })
        .catch(error => {
            console.error(error);
            res.status(401).json({Error: 'Unable to Update Reading List'})
    })
})


export default router; 