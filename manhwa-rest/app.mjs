import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import manhwaRoutes from './controllers/manhwa-controller.mjs'
import userRoutes from './controllers/user-controller.mjs'
import refreshRoute from './controllers/refresh-token.mjs';
import logoutRoute from './controllers/logout-user-contoller.mjs'
import verifyJWT from './middleware/verifyJWT.js';


const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// routes
app.use('/', manhwaRoutes);
app.use('/', userRoutes);
app.use('/', refreshRoute);
app.use('/', logoutRoute);

// all routes after this will use verifyJWT middleware
// app.use(verifyJWT);
// user page ... 

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});