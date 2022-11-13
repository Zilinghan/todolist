import express, { NextFunction, Request, Response, Router } from 'express';
import UserGetController from '../../controllers/user_controllers/UserGetController';
import UserPostController from '../../controllers/user_controllers/UserPostController';
import bodyParser from 'body-parser';

class UserRouter {
    private _router = Router();
    private _getController = UserGetController;
    private _postController = UserPostController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    private _configure() {
        this._router.use(bodyParser.urlencoded({
            extended: true
        }));
        this._router.use(bodyParser.json())
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            this._getController.getUser(req, res);
            // try {
            //     const result = this._getController.defaultMethod();
            //     res.status(200).json(result);
            // }
            // catch (error) {
            //     next(error);
            // }
        });
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            const result = this._postController.postUser(req, res);
            // try {
            //     const result = this._postController.postUser(req, res);
            //     res.status(200).json(result);
            // }
            // catch (error) {
            //     next(error);
            // }
        });
    }
}

export = new UserRouter().router;