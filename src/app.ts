import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import MasterRouter from './routers/MasterRouter';
import ErrorHandler from './models/ErrorHandler';
const secrets = require('./config/secret.ts');
const mongoose = require('mongoose');


// load the environment variables from the .env file
dotenv.config({
    path: '.env'
});

class Server {
    public app = express();
    public router = MasterRouter;
}

mongoose.connect(secrets.mongo_connection, {useNewUrlParser: true});

// initialize server app
const server = new Server();

mongoose.connect(secrets.mongo_connection, {useNewUrlParser: true});

// make server app handle any route starting with '/api'
server.app.use('/api', server.router);

// make server app handle any error
server.app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message
    });
});

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
    server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();