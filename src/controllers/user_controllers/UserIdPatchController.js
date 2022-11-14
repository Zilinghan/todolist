const User = require('../../models/User.js');
const Task = require('../../models/Task.js');
const Group = require('../../models/Group.js');

class UserIdPatchController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async patchIdUser(req, res){
        try{
            if (req.body.individualTasks) {
                console.log("Task finding...")
                const task = await Task.find({_id: req.body.individualTasks})
                    .select({_id: 1});
                console.log("Task found...")
                if (task.length === 0){
                    return res.status(400).json({
                        message: "Given task does not exist!",
                        data: null
                    })
                }
                else {
                    if (req.body.operation === 'add') {
                        const userUpdateRes = await User.updateOne({_id: req.params.id}, {$addToSet: {individualTasks: req.body.individualTasks}});
                        const taskUpdateRes = await Task.updateOne({_id: req.body.individualTasks}, {$addToSet: {assignedUsers: req.params.id}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else if (req.body.operation === 'remove') {
                        const userUpdateRes = await User.updateOne({_id: req.params.id}, {$pull: {individualTasks: req.body.individualTasks}});
                        const taskUpdateRes = await Task.updateOne({_id: req.body.individualTasks}, {$pull: {assignedUsers: req.params.id}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else {
                        return res.status(400).json({
                            message: "Bad Request!",
                            data: null
                        })
                    }
                }
            }
            else if (req.body.belongingGroups) {
                const group = await Group.find({_id: req.body.belongingGroups})
                    .select({_id: 1});
                if (group.length === 0){
                    return res.status(400).json({
                        message: "Given group does not exist!",
                        data: null
                    })
                }
                else {
                    if (req.body.operation === 'add') {
                        const userUpdateRes = await User.updateOne({_id: req.params.id}, {$addToSet: {belongingGroups: req.body.belongingGroups}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else if (req.body.operation === 'remove') {
                        const userUpdateRes = await User.updateOne({_id: req.params.id}, {$pull: {belongingGroups: req.body.belongingGroups}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else {
                        return res.status(400).json({
                            message: "Bad Request!",
                            data: null
                        })
                    }
                }
            }
            else if (req.body.unreadTasks) {
                const task = await Task.find({_id: req.body.unreadTasks})
                    .select({_id: 1});
                if (task.length === 0){
                    return res.status(400).json({
                        message: "Given task does not exist!",
                        data: null
                    })
                }
                else {
                    if (req.body.operation === 'add') {
                        const userUpdateRes = await User.updateOne({_id: req.params.id}, {$addToSet: {unreadTasks: req.body.unreadTasks}});
                        const taskUpdateRes = await Task.updateOne({_id: req.body.unreadTasks}, {$addToSet: {assignedUsers: req.params.id}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else if (req.body.operation === 'remove') {
                        const userUpdateRes = await User.updateOne({_id: req.params.id}, {$pull: {unreadTasks: req.body.unreadTasks}});
                        const taskUpdateRes = await Task.updateOne({_id: req.body.unreadTasks}, {$pull: {assignedUsers: req.params.id}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else {
                        return res.status(400).json({
                            message: "Bad Request!",
                            data: null
                        })
                    }
                }
            }
            else if (req.body.invitingGroups) {
                const group = await Group.find({_id: req.body.invitingGroups})
                    .select({_id: 1});
                if (group.length === 0){
                    return res.status(400).json({
                        message: "Given group does not exist!",
                        data: null
                    })
                }
                else {
                    if (req.body.operation === 'add') {
                        const userUpdateRes = await User.updateOne({_id: req.params.id}, {$addToSet: {invitingGroups: req.body.invitingGroups}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else if (req.body.operation === 'remove') {
                        const userUpdateRes = await User.updateOne({_id: req.params.id}, {$pull: {invitingGroups: req.body.invitingGroups}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else {
                        return res.status(400).json({
                            message: "Bad Request!",
                            data: null
                        })
                    }
                }
            }
            else {
                return res.status(400).json({
                    message: "Bad Request!",
                    data: null
                })
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "Bad Request!",
                data: null
            })
        }
    }
}

module.exports = new UserIdPatchController();