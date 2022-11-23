const Task = require('../../models/Task');

class TaskGetController {
    async getTask(req:any, res: any){
        try{
            const task = await Task.find(req.query.where == null ? {} : JSON.parse(req.query.where))
                .limit(parseInt(req.query.limit))
                .select(req.query.select == null ? {} : JSON.parse(req.query.select))
                .sort(req.query.sort == null ? {} : JSON.parse(req.query.sort))
                .skip(req.query.skip == null ? 0 : parseInt(req.query.skip));
            if (task.length === 0) {
                return res.status(404).json({message: "Task not found!", data: null});
            }
            else {
                return res.status(200).json({message: "OK", data: task});
            }
        }
        catch (error) {
            return res.status(500).json({message: "Sorry, we meet some sever error for getting you the data.", data: null});
        }
    }
}

export = new TaskGetController();