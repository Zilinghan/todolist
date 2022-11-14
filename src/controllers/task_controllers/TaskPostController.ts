import {Request, Response} from "express";
const Task = require('../../models/Task');

class TaskPostController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async postTask(req: Request, res: Response) {
        console.log(req.body);
        const newTask = new Task(req.body);
        try {
            const saveRes = await newTask.save();
            console.log(saveRes)
            return res.status(201).json({
                message: "Task created!",
                data: saveRes
            });
        }
        catch (e:any) {
            var err_msg = "";
            console.log(e.errors)
            if (e.errors.deadline) {
                err_msg += e.errors.deadline.properties.message;
            }
            if (e.errors.name) {
                err_msg += e.errors.name.properties.message;
            }
            console.log(err_msg);
            res.status(400);
            return res.json({
                message: err_msg,
                data: null
            });
        }
    }
}

export = new TaskPostController();