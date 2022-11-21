import express, { NextFunction, Request, Response, Router } from 'express';
import UserGetController from '../../controllers/user_controllers/UserGetController';
import UserPostController from '../../controllers/user_controllers/UserPostController';
import UserIdGetController from '../../controllers/user_controllers/UserIdGetController'
import bodyParser from 'body-parser';
const UserIdPatchController = require( '../../controllers/user_controllers/UserIdPatchController.js');
const UserIdPutController = require( '../../controllers/user_controllers/UserIdPutController');


class UserRouter {
    private _router = Router();
    private _getController = UserGetController;
    private _postController = UserPostController;
    private _idGetController = UserIdGetController;
    private _idPutController = UserIdPutController;
    private _idPatchController = UserIdPatchController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use(bodyParser.urlencoded({
            extended: true
        }));
        this._router.use(bodyParser.json())
        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            this._getController.getUser(req, res);
        });
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            this._postController.postUser(req, res);
        });
        this._router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
            this._idGetController.getIdUser(req, res);
        })
        this._router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
            this._idPatchController.patchIdUser(req, res);
        })
        this._router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
            this._idPutController.putIdUser(req, res);
        })

    }
}

export = new UserRouter().router;