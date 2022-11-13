import { Router } from 'express';
import UserRouter from './User/UserRouter';
import TaskRouter from './Task/TaskRouter';
import GroupRouter from  './Group/GroupRouter';

class MasterRouter {
    private _router = Router();
    private _subrouterUser = UserRouter;
    private _subrouterTask = TaskRouter;
    private _subrouterGroup = GroupRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching routers.
     */
    private _configure() {
        this._router.use('/users', this._subrouterUser);
        this._router.use('/tasks', this._subrouterTask);
        this._router.use('/groups', this._subrouterGroup);
    }
}

export = new MasterRouter().router;