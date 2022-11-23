import {Request, Response} from "express";
const Task = require('../../models/Task');

class TaskPostController {

    async postTask(req: Request, res: Response) {
        /* For task, the POST method is used to create a new task with necessary information, i.e., name and endTime */
        const newTask = new Task(req.body);
        try {
            const saveRes = await newTask.save();
            return res.status(201).json({message: "Task created!", data: saveRes});
        }
        catch (e:any) {
            var err_msg = "";
            if (e.errors.endTime) {
                err_msg += e.errors.endTime.properties.message;
            }
            if (e.errors.name) {
                err_msg += e.errors.name.properties.message;
            }
            res.status(400);
            return res.json({
                message: err_msg,
                data: null
            });
        }
    }
}

export = new TaskPostController();