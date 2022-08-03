import * as manhwas from '../models/manhwa-model.mjs';
import express from 'express';

const router = express.Router()


// create a manhwa 
router.post('/manhwas', (req, res) => {
    manhwas.createManhwa(req.body.title, req.body.image, req.body.authors, req.body.date, req.body.manhwaStatus, req.body.genres, req.body.description)
    .then(manhwa => {
        res.status(201).json(manhwa);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request Failed'});
    });
});

// get disctinct genres
router.get('/genres', (req, res) => {
    manhwas.findGenres()
    .then(genres => {
        res.send(genres);
    })
    .catch(error => {
        console.error(error);
        res.send({Error: 'Request failed'});
    });
});

// get all manhwas
router.get('/manhwas', (req, res) => {
    let filter = {};
    if (req.body.genres !== undefined){
        filter = req.body.genres;
    }
    manhwas.findManhwas(filter, '', 0)
        .then(manhwas => {
            res.send(manhwas);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed'});
        });
});

// search for a manhwa 
router.post('/search', (req,res) => {
    
    // set filter
    let filter = {};
    if (req.body.title !== undefined){
        filter = req.body.title;
    };

    manhwas.findManhwas({'title' : {$regex : filter, $options :'i'} })
        .then(manhwas => {
            res.send(manhwas);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed'});
        });
});

// find manhwa by genre 
router.post('/manhwas/genres', (req, res) => {
    
    // set filter
    let filter = {};
    if (req.body.genres !== undefined){
        filter = req.body.genres;
    };

    manhwas.findManhwaByGenre(filter)
        .then(manhwas => {
            res.send(manhwas);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed'});
        });
});

// find manhwa by filtering 
router.post('/manhwas/filter', (req, res) => {
    
    // set filter
    let filter = {};
    if (req.body.genres !== undefined){
        filter = req.body.genres;
    };

    manhwas.findManhwaByGenre({$all: filter})
        .then(manhwas => {
            res.send(manhwas);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed'});
        });
});

export default router; 
