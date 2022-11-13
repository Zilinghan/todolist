import { NextFunction, Request, Response, Router } from 'express';
import GroupGetController from '../../controllers/GroupGetController';
import GroupPostController from '../../controllers/GroupPostController';

class GroupRouter {
    private _router = Router();
    private _getController = GroupGetController;
    private _postController = GroupPostController;

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

export = new GroupRouter().router;