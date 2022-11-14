import { NextFunction, Request, Response, Router } from 'express';
import GroupGetController from '../../controllers/group_controllers/GroupGetController';
import GroupPostController from '../../controllers/group_controllers/GroupPostController';
import bodyParser from "body-parser";
const GroupIdGetController = require('../../controllers/group_controllers/GroupIdGetController');
const GroupIdPutController = require('../../controllers/group_controllers/GroupIdPutController');

class GroupRouter {
    private _router = Router();
    private _getController = GroupGetController;
    private _postController = GroupPostController;
    private _getIdController = GroupIdGetController;
    private _putIdController = GroupIdPutController;

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
            this._getController.getGroup(req, res);
        });
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            this._postController.postGroup(req, res);
        });
        this._router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
            this._getIdController.getIdGroup(req, res);
        });
        this._router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
            this._putIdController.putIdGroup(req, res);
        })
    }
}

export = new GroupRouter().router;