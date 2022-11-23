const Task = require('../../models/Task');
const User = require('../../models/User');

class TaskIdPatchController {
    async patchIdTask(req, res){
        /* For task, the PATCH method is used to add or delete one assigned user for the given task.
        *  The request body should consist of two parts: assignedUsers and operation (add/remove),
        *  where `add` indicates adding the given assigned User to the task, while `remove` indicates deletion.
        * */
        if (req.body.assignedUsers) {
            /* Check the validity of the given assigned user */
            try {
                const user = await User.find({_id: req.body.assignedUsers}).select({_id: 1});
                if (user.length == 0) {
                    return res.status(400).json({message: "Given user does not exist!", data: null});
                }
            }
            catch (e) {
                return res.status(400).json({message: "Given user does not exist!", data: null});
            }
            /* Check the validity of the given task */
            var task;
            try {
                task = await Task.find({_id: req.params.id}).select({_id: 0, assignedGroup: 1});
                if (task.length === 0) {
                    return res.status(404).json({message: "Given task does not exist!", data: null});
                }
            }
            catch (e) {
                return res.status(404).json({message: "Given task does not exist!", data: null});
            }
            /* Start the operation: add/remove the given assigned user to/from the task */
            if (req.body.operation === 'add') {
                await Task.updateOne({_id: req.params.id}, {$addToSet: {assignedUsers: req.body.assignedUsers}});
                /* If individual task, update the task to the user individual task as well */
                if (task[0].assignedGroup === "") {
                    await User.updateOne({_id: req.body.assignedUsers}, {$addToSet: {individualTasks: req.params.id}})
                }
                /* If group task, update the task to the user's unread task for reminder */
                else {
                    await User.updateOne({_id: req.body.assignedUsers}, {$addToSet: {unreadTasks: req.params.id}})
                }
                return res.status(200).json({message: "Success", data: null});
            }
            else if (req.body.operation === 'remove') {
                await Task.updateOne({_id: req.params.id}, {$pull: {assignedUsers: req.body.assignedUsers}});
                /* If individual task, update the task to the user individual task as well */
                if (task[0].assignedGroup === "") {
                    await User.updateOne({_id: req.body.assignedUsers}, {$pull: {individualTasks: req.params.id}})
                }
                /* If group task, update the task to the user's unread task for reminder */
                else {
                    try {
                        await User.updateOne({_id: req.body.assignedUsers}, {$pull: {unreadTasks: req.params.id}})
                    }
                    catch (e) {
                    }
                }
                return res.status(200).json({message: "Success", data: null});
            }
            else {
                return res.status(400).json({message: "Bad request: not operation given", data: null});
            }
        }
        else {
            return res.status(400).json({message: "Bad request: no given assigned user!", data: null});
        }
    }
}

module.exports = new TaskIdPatchController();