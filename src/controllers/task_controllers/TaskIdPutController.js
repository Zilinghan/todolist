const Task = require('../../models/Task');
const Group = require('../../models/Group');

class TaskIdPutController {
    async putIdTask(req, res){
        /* For task, PUT method is mainly used for changing the `assignedGroup` a for the task.
        *  The method will change the assignedGroup for the task, and change the groupTasks for the group. (Two-way reference)
        *  It can also change the general group information such as group name and group description.
        *  Note: PUT method is not responsible for changing the `assignedUsers`, if you want to change, use the PATCH method
        * */
        if (req.body.assignedUsers) {
            delete req.body.assignedUsers;
        }
        /* If `assignedGroup` is given in the request, we check the validity of the input and deal with the two-way reference */
        if (req.body.assignedGroup) {
            /* Check the validity of the given assigned group */
            try {
                const group = await Group.find({_id: req.body.assignedGroup}).select({_id: 1});
                if (group.length === 0) {
                    return  res.status(400).json({message: "The assigned group does not exist!", data: null});
                }
            }
            catch (e) {
                return res.status(400).json({message: "The assigned group does not exist!", data: null});
            }
            /* Check the validity of the given task */
            var task;
            try {
                task = await Task.find({_id: req.params.id}).select({_id: 0, assignedGroup: 1});
                if (task.length === 0) {
                    return res.status(404).json({message: "Task not found!", data: null});
                }
            }
            catch (e) {
                return res.status(404).json({message: "Task not found!", data: null});
            }
            /* Deal with the two-way reference */
            try {
                const oldGroup = task[0].assignedGroup;
                if (oldGroup !== req.body.assignedGroup) {
                    await Group.updateOne({_id: req.body.assignedGroup}, {$addToSet: {groupTasks: req.params.id}})
                    if (oldGroup != "") {
                        await Group.updateOne({_id: oldGroup}, {$pull: {groupTasks: req.params.id}});
                    }
                }
            }
            catch (e) {
                return res.status(404).json({message: "Sorry, we met some internal error!", data: null});
            }
        }
        /* Update the task */
        try {
            const task = await Task.updateOne({_id: req.params.id}, req.body);
            return res.status(200).json({message: "Success", data: null})
        }
        catch (e) {
            return res.status(404).json({message: "Task does not exist!", data: null})
        }
    }
}

module.exports = new TaskIdPutController();