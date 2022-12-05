import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import MasterRouter from './routers/MasterRouter';
import ErrorHandler from './models/ErrorHandler';
const secrets = require('./config/secret.ts');
const mongoose = require('mongoose');
import bodyParser from 'body-parser';
const multer = require('multer');


// load the environment variables from the .env file
dotenv.config({
    path: '.env'
});

class Server {
    public app = express();
    public router = MasterRouter;
}

// initialize server app
const server = new Server();

mongoose.connect(secrets.mongo_connection, {useNewUrlParser: true});
console.log("Connected to the database successfully!");

var storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads')
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

var allowCrossDomain = function (req:any, res:any, next:any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, PATCH");
    next();
};
server.app.use(allowCrossDomain);

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

// Use the body-parser package in our application
server.app.use(bodyParser.urlencoded({
    extended: true
}));
server.app.use(bodyParser.json());

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
    server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();