import { NextFunction, Request, Response, Router } from 'express';
import TaskGetController from '../../controllers/task_controllers/TaskGetController';
import TaskPostController from '../../controllers/task_controllers/TaskPostController';
import bodyParser from "body-parser";

class TaskRouter {
    private _router = Router();
    private _getController = TaskGetController;
    private _postController = TaskPostController;

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
            try {
                const result = this._getController.defaultMethod();
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = this._postController.defaultMethod();
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}

export = new TaskRouter().router;