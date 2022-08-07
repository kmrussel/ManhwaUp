import * as users from '../models/user-model.mjs';
import express from 'express';

const router = express.Router()


// add manhwa to reading list
router.post('/reading-list/add', async (req, res) => {
    const foundUser = await users.findUser({ email: req.body.user });

    if (!foundUser) {
        return res.sendStatus(404);
    }

    const id = foundUser._id;
    const foundManhwa = await users.findManhwa(id, req.body.manhwa);

    // manhwa is already in reading list 
    if (foundManhwa) {
        return res.status(401).json({ InList: foundManhwa });
    }

    users.updateList(id, { $push: { readingList: req.body.manhwa } })
        .then(result => {
            res.status(201).json({ modifiedCount: result.modifiedCount });
        })
        .catch(error => {
            console.error(error);
            res.status(401).json({ Error: 'Unable to Update Reading List' });
        });
})


// remove manhwa from reading list 
router.post('/reading-list/remove', async (req, res) => {
    const foundUser = await users.findUser({ email: req.body.user })

    if (!foundUser) {
        return res.sendStatus(404);
    }

    const id = foundUser._id

    users.updateList(id, { $pull: { readingList: req.body.manhwa } })
        .then(result => {
            res.status(201).json({ modifiedCount: result.modifiedCount });
        })
        .catch(error => {
            console.error(error);
            res.status(401).json({ Error: 'Unable to Update Reading List' });
        });
})


export default router; 