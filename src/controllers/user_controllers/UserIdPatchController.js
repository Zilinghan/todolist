const User = require('../../models/User.js');
const Task = require('../../models/Task.js');
const Group = require('../../models/Group.js');

class UserIdPatchController {
    async patchIdUser(req, res){
        /* For user, the PATCH method is used to update the properties of user which requires two-way reference.
        *  Each PATCH can only change one of the properties each time, and you need to specify the operation: add/remove.
        * */
        try{
            if (req.body.individualTasks) {
                /* Check the validity of the task */
                const task = await Task.find({_id: req.body.individualTasks}).select({_id: 1});
                if (task.length === 0){
                    return res.status(400).json({message: "Given task does not exist!", data: null});
                }
                else {
                    if (req.body.operation === 'add') {
                        /* Deal with the two-way reference */
                        await User.updateOne({_id: req.params.id}, {$addToSet: {individualTasks: req.body.individualTasks}});
                        await Task.updateOne({_id: req.body.individualTasks}, {$addToSet: {assignedUsers: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove') {
                        /* Deal with the two-way reference */
                        await User.updateOne({_id: req.params.id}, {$pull: {individualTasks: req.body.individualTasks}});
                        await Task.updateOne({_id: req.body.individualTasks}, {$pull: {assignedUsers: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else {
                        return res.status(400).json({message: "Bad Request!", data: null});
                    }
                }
            }
            else if (req.body.belongingGroups) {
                const group = await Group.find({_id: req.body.belongingGroups}).select({_id: 1});
                if (group.length === 0){
                    return res.status(400).json({message: "Given group does not exist!", data: null});
                }
                else {
                    if (req.body.operation === 'add' && req.body.role === 'leader') {
                        await User.updateOne({_id: req.params.id}, {$addToSet: {belongingGroups: req.body.belongingGroups}});
                        await Group.updateOne({_id: req.body.belongingGroups}, {$addToSet: {leaders: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'add' && req.body.role === 'member') {
                        await User.updateOne({_id: req.params.id}, {$addToSet: {belongingGroups: req.body.belongingGroups}});
                        await Group.updateOne({_id: req.body.belongingGroups}, {$addToSet: {members: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove' && req.body.role === 'leader') {
                        await User.updateOne({_id: req.params.id}, {$pull: {belongingGroups: req.body.belongingGroups}});
                        await Group.updateOne({_id: req.body.belongingGroups}, {$pull: {leaders: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove' && req.body.role === 'member') {
                        await User.updateOne({_id: req.params.id}, {$pull: {belongingGroups: req.body.belongingGroups}});
                        await Group.updateOne({_id: req.body.belongingGroups}, {$pull: {members: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else {
                        return res.status(400).json({message: "Bad Request!", data: null});
                    }
                }
            }
            else if (req.body.unreadTasks) {
                const task = await Task.find({_id: req.body.unreadTasks}).select({_id: 1});
                if (task.length === 0){
                    return res.status(400).json({message: "Given task does not exist!", data: null});
                }
                else {
                    if (req.body.operation === 'add') {
                        await User.updateOne({_id: req.params.id}, {$addToSet: {unreadTasks: req.body.unreadTasks}});
                        await Task.updateOne({_id: req.body.unreadTasks}, {$addToSet: {assignedUsers: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove') {
                        await User.updateOne({_id: req.params.id}, {$pull: {unreadTasks: req.body.unreadTasks}});
                        await Task.updateOne({_id: req.body.unreadTasks}, {$pull: {assignedUsers: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else {
                        return res.status(400).json({message: "Bad Request!", data: null});
                    }
                }
            }
            else if (req.body.invitingGroups) {
                const group = await Group.find({_id: req.body.invitingGroups}).select({_id: 1});
                if (group.length === 0){
                    return res.status(400).json({message: "Given group does not exist!", data: null});
                }
                else {
                    if (req.body.operation === 'add' && req.body.role === 'leader') {
                        await User.updateOne({_id: req.params.id}, {$addToSet: {invitingGroups: req.body.invitingGroups}});
                        await Group.updateOne({_id: req.body.invitingGroups}, {$addToSet: {pendingLeaders: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'add' && req.body.role === 'member') {
                        await User.updateOne({_id: req.params.id}, {$addToSet: {invitingGroups: req.body.invitingGroups}});
                        await Group.updateOne({_id: req.body.invitingGroups}, {$addToSet: {pendingMembers: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove' && req.body.role === 'leader') {
                        await User.updateOne({_id: req.params.id}, {$pull: {invitingGroups: req.body.invitingGroups}});
                        await Group.updateOne({_id: req.body.invitingGroups}, {$pull: {pendingLeaders: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove' && req.body.role === 'member') {
                        await User.updateOne({_id: req.params.id}, {$pull: {invitingGroups: req.body.invitingGroups}});
                        await Group.updateOne({_id: req.body.invitingGroups}, {$pull: {pendingMembers: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else {
                        return res.status(400).json({message: "Bad Request!", data: null});
                    }
                }
            }
            else {
                return res.status(400).json({message: "Bad Request!", data: null});
            }
        }
        catch (error) {
            return res.status(400).json({message: "Bad Request!", data: null});
        }
    }
}

module.exports = new UserIdPatchController();