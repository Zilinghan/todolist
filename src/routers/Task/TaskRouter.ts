import { NextFunction, Request, Response, Router } from 'express';
import TaskGetController from '../../controllers/task_controllers/TaskGetController';
import TaskPostController from '../../controllers/task_controllers/TaskPostController';
import bodyParser from "body-parser";
const TaskIdGetController = require('../../controllers/task_controllers/TaskIdGetController');
const TaskIdPutController = require('../../controllers/task_controllers/TaskIdPutController');
const TaskIdPatchController = require('../../controllers/task_controllers/TaskIdPatchController');

class TaskRouter {
    private _router = Router();
    private _getController = TaskGetController;
    private _postController = TaskPostController;
    private _getIdController = TaskIdGetController;
    private _putIdController = TaskIdPutController;
    private _patchIdController = TaskIdPatchController;

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
            this._getController.getTask(req, res);
        });
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            this._postController.postTask(req, res);
        });
        this._router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
            this._getIdController.getIdTask(req, res);
        })
        this._router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
            this._putIdController.putIdTask(req, res);
        })
        this._router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
            this._patchIdController.patchIdTask(req, res);
        })
    }
}

export = new TaskRouter().router;