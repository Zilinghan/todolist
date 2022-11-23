const Task = require('../../models/Task');

class TaskIdGetController {
    async getIdTask(req:any, res: any){
        try{
            const task = await Task.find({_id: req.params.id}).select(req.query.select == null ? {} : JSON.parse(req.query.select));
            if (task.length === 0) {
                return res.status(404).json({message: "Task not found!", data: null});
            }
            else {
                return res.status(200).json({message: "OK", data: task});
            }
        }
        catch (error) {
            return res.status(404).json({message: "Task not found!", data: null});
        }
    }
}

export = new TaskIdGetController();