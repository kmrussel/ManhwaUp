import 'dotenv/config';
import * as manhwas from './manhwa-model.mjs';
import express from 'express';


const app = express();

const PORT = process.env.PORT;

app.use(express.json());

// POST
app.post('/manhwas', (req, res) => {
    manhwas.createManhwa(req.body.title, req.body.image, req.body.authors, req.body.date, req.body.manhwaStatus, req.body.genres, req.body.description)
    .then(manhwa => {
        res.status(201).json(manhwa);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request Failed'})
    });
});
// GET distinct genre
app.get('/genres', (req, res) => {
    manhwas.findGenres()
    .then(genres => {
        res.send(genres);
    })
    .catch(error => {
        console.error(error);
        res.send({Error: 'Request failed'})
    })
})

// GET ALL
app.get('/manhwas', (req, res) => {
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

// POST by genres
app.post('/manhwas/genres', (req, res) => {
    let filter = {};
    if (req.body.genres !== undefined){
        filter = req.body.genres;
    }
    manhwas.findManhwaByGenre(filter)
        .then(manhwas => {
            res.send(manhwas);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed'});
        });
});

app.post('/manhwas/filter', (req, res) => {
    let filter = {};
    if (req.body.genres !== undefined){
        filter = req.body.genres;
    }
    manhwas.findManhwaByGenre({$all: filter})
        .then(manhwas => {
            res.send(manhwas);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed'});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});