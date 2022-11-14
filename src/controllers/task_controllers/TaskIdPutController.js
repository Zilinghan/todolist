const Task = require('../../models/Task');
const Group = require('../../models/Group');

class TaskIdPutController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async putIdTask(req, res){
        /* User cannot put assigned user via Put, only support Patch */
        if (req.body.assignedUsers) {
            delete req.body.assignedUsers;
        }

        if (req.body.assignedGroup) {
            /* Check the validity of the given assigned Group */
            try {
                const group = await Group.find({_id: req.body.assignedGroup}).select({_id: 1});
                if (group.length === 0) {
                    return  res.status(400).json({
                        message: "The assigned group does not exist!",
                        data: null
                    })
                }
            }
            catch (e) {
                return res.status(400).json({
                    message: "The assigned group does not exist!",
                    data: null
                })
            }
            /* Change the two-way reference pointer */
            try {
                const task = await Task.find({_id: req.params.id}).select({_id: 0, assignedGroup: 1});
                if (task.length === 0) {
                    return res.status(404).json({
                        message: "Task not found!",
                        data: null
                    });
                }
                const oldGroup = task[0].assignedGroup;
                if (oldGroup !== req.body.assignedGroup) {
                    Group.updateOne({_id: req.body.assignedGroup}, {$addToSet: {groupTasks: req.params.id}});
                    if (oldGroup != "") {
                        Group.updateOne({_id: oldGroup}, {$pull: {groupTasks: req.params.id}});
                    }
                }
            }
            catch (e) {
                return res.status(404).json({
                    message: "Task not found!",
                    data: null
                })
            }
        }
        /* Update the task */
        try {
            const task = await Task.updateOne({_id: req.params.id}, req.body);
            return res.status(200).json({
                message: "Success",
                data: null
            })
        }
        catch (e) {
            return res.status(404).json({
                message: "Task does not exist!",
                data: null
            })
        }
    }
}

module.exports = new TaskIdPutController();