import 'dotenv/config';
import * as manhwas from './manhwa-model.mjs';
import * as users from './user-model.mjs';
import express, { response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 
const app = express();


const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view-engine', 'ejs')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next(); 
})

// user.updateToken(user._id, user.username, user.email, user.password, refreshToken)
// res.cookie('jwt', refreshToken, {httpOnly: true, 
// sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

// res.status(201).send({
//     message: "Login successful",
//     username: user.username,
//     email: user.email,
//     password: user.password,
//     refreshToken: refreshToken
//  })
// Login 

app.post("/login", (req, res) => {
    users.findUser(req.body.email)
    .then((user) => {
        bcrypt.compare(req.body.password, user.password)
        .then((passwordCheck) =>
        {if (!passwordCheck) {
            return res.status(400).send({
                message: "Password does not match", error
            })
            
        }
        const token = jwt.sign(
            {
                userId: user._id,
                userEmail: user.email
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
        );
        
        res.status(201).send({
            message: "Login successful",
            email: user.email,
            token
         })
        
        })
        .catch ((error) => {
            res.status(400).send({
                message: "Password doesn't match",
                error
            });
           
        });
    })
    .catch((e) => {
        response.status(404).send({
            message:"Email not found", e
        })
        
    })

});

// Register
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    try{
        (users.createUser(req.body.username, req.body.email, hashedPassword))
        .then(user => {res.status(201).json(user)})
    }

    catch{(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request Failed'})
    })
    }   
         
})

// POST
app.post('/manhwas', (req, res) => {
    manhwas.createManhwa(req.body.title, req.body.image, req.body.authors, req.body.date, req.body.manhwaStatus, req.body.genres, req.body.description)
    .then(manhwa => {
        res.status(201).json(manhwa);
    })
    .catch(error => {

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

app.post('/search', (req,res) => {
    let filter = {};
    if (req.body.title !== undefined){
        filter = req.body.title;
    }
    manhwas.findManhwas({'title' : {$regex : filter, $options :'i'} })
        .then(manhwas => {
            res.send(manhwas);
        })
        .catch(error => {
            console.error(error)
            res.send({ Error: 'Request failed'});
        })
})

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