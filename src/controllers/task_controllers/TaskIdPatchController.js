const Task = require('../../models/Task');
const User = require('../../models/User');

class TaskIdPatchController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async patchIdTask(req, res){
        /* patchIdTask:
            This function (PATCH request) is only used for adding/removing assigned users for tasks
         */
        if (req.body.assignedUsers) {
            const user = await User.find({_id: req.body.assignedUsers}).select({_id: 1});
            if (user.length == 0) {
                return res.status(400).json({
                    message: "Given user does not exist!",
                    data: null
                })
            }
            else {
                var task;
                try {
                    task = await Task.find({_id: req.params.id}).select({_id: 0, assignedGroup: 1});
                    if (task.length === 0) {
                        return res.status(404).json({
                            message: "Task not found!",
                            data: null
                        })
                    }
                }
                catch (e) {
                    return res.status(404).json({
                        message: "Task not found!",
                        data: null
                    })
                }
                if (req.body.operation === 'add') {
                    await Task.updateOne({_id: req.params.id}, {$addToSet: {assignedUsers: req.body.assignedUsers}});
                    if (task[0].assignedGroup === "") {
                        await User.updateOne({_id: req.body.assignedUsers}, {$addToSet: {individualTasks: req.params.id}})
                    }
                    return res.status(200).json({
                        message: "Success",
                        data: null
                    });
                }
                else if (req.body.operation === 'remove') {
                    await Task.updateOne({_id: req.params.id}, {$pull: {assignedUsers: req.body.assignedUsers}});
                    if (task[0].assignedGroup === "") {
                        await User.updateOne({_id: req.body.assignedUsers}, {$pull: {individualTasks: req.params.id}})
                    }
                    return res.status(200).json({
                        message: "Success",
                        data: null
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Bad request: not operation given",
                        data: null
                    });
                }
            }
        }
        else {
            return res.status(400).json({
                message: "Bad request: no given assigned user!",
                data: null
            })
        }
    }
}

module.exports = new TaskIdPatchController();