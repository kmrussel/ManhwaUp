import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import corsOptions from './config/corsOptions.js';
import cors from 'cors';
import manhwaRoutes from './controllers/manhwa-controller.mjs'
import userRoutes from './controllers/user-controller.mjs'
import refreshRoute from './controllers/refresh-token.mjs';
import logoutRoute from './controllers/logout-user-contoller.mjs'
import verifyJWT from './middleware/verifyJWT.js';
import userInfoRoute from './controllers/user-info-controller.mjs'
import credentials from './middleware/credentials.js';
const app = express();

const PORT = process.env.PORT;

app.use(credentials);
app.use(cors({origin: 'http://localhost:8000'}))

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

// routes
app.use('/', manhwaRoutes);
app.use('/', userRoutes);
app.use('/', refreshRoute);
app.use('/', logoutRoute);

// all routes after this will use verifyJWT middleware
app.use(verifyJWT);
app.use('/', userInfoRoute);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});