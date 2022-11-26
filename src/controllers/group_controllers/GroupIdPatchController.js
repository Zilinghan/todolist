const User = require('../../models/User.js');
const Task = require('../../models/Task.js');
const Group = require('../../models/Group.js');

class GroupIdPatchController {
    async patchIdGroup(req, res){
        /* For group, the PATCH method is used to change the properties of group which may require two-way reference,
        * including leaders, pendingLeaders, members, pendingMembers, and groupTasks.
        * */
        try {
            if (req.body.leaders) {
                /* Check the validity of the input */
                const leader = await User.find({_id: req.body.leaders}).select({_id: 1});
                if (leader.length === 0) {
                    return res.status(400).json({message: "Given leader does not exist!", data: null});
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {leaders: req.body.leaders}});
                        await User.updateOne({_id: req.body.leaders}, {$addToSet: {belongingGroups: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {leaders: req.body.leaders}});
                        await User.updateOne({_id: req.body.leaders}, {$pull: {belongingGroups: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else {
                        return res.status(400).json({message: "Bad Request!", data: null});
                    }
                }
            }
        }
        catch (e) {
            return res.status(400).json({message: "Given leader does not exist!", data: null});
        }
        try {
            if (req.body.pendingLeaders) {
                /* Check the validity of the input */
                const leader = await User.find({_id: req.body.pendingLeaders}).select({_id: 1});
                if (leader.length === 0) {
                    return res.status(400).json({message: "Given leader does not exist!", data: null});
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {pendingLeaders: req.body.pendingLeaders}});
                        await User.updateOne({_id: req.body.pendingLeaders}, {$addToSet: {invitingGroups: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {pendingLeaders: req.body.pendingLeaders}});
                        await User.updateOne({_id: req.body.pendingLeaders}, {$pull: {invitingGroups: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else {
                        return res.status(400).json({message: "Bad Request!", data: null});
                    }
                }
            }
        }
        catch (e) {
            return res.status(400).json({message: "Given leader does not exist!", data: null});
        }
        try {
            if (req.body.members) {
                /* Check the validity of the input */
                const member = await User.find({_id: req.body.members}).select({_id: 1});
                if (member.length === 0) {
                    return res.status(400).json({message: "Given member does not exist!", data: null});
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {members: req.body.members}});
                        await User.updateOne({_id: req.body.members}, {$addToSet: {belongingGroups: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {members: req.body.members}});
                        await User.updateOne({_id: req.body.members}, {$pull: {belongingGroups: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else {
                        return res.status(400).json({message: "Bad Request!", data: null});
                    }
                }
            }
        }
        catch (e) {
            return res.status(400).json({message: "Given member does not exist!", data: null});
        }
        try {
            if (req.body.pendingMembers) {
                /* Check the validity of the input */
                const member = await User.find({_id: req.body.pendingMembers}).select({_id: 1});
                if (member.length === 0) {
                    return res.status(400).json({message: "Given member does not exist!", data: null});
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {pendingMembers: req.body.pendingMembers}});
                        await User.updateOne({_id: req.body.pendingMembers}, {$addToSet: {invitingGroups: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {pendingMembers: req.body.pendingMembers}});
                        await User.updateOne({_id: req.body.pendingMembers}, {$pull: {invitingGroups: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else {
                        return res.status(400).json({message: "Bad Request!", data: null});
                    }
                }
            }
        }
        catch (e) {
            return res.status(400).json({message: "Given member does not exist!", data: null});
        }
        try {
            if (req.body.groupTasks) {
                /* Check the validity of the input */
                const task = await Task.find({_id: req.body.groupTasks}).select({_id: 1});
                if (task.length === 0) {
                    return res.status(400).json({message: "Given task does not exist!", data: null});
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {groupTasks: req.body.groupTasks}});
                        await Task.updateOne({_id: req.body.groupTasks}, {$set: {assignedGroup: req.params.id}});
                        return res.status(200).json({message: "Success!", data: null});
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {groupTasks: req.body.groupTasks}});
                        // TODO: how to update user here?
                        return res.status(200).json({message: "Success!", data: null})
                    }
                    else {
                        return res.status(400).json({message: "Bad Request!", data: null});
                    }
                }
            }
        }
        catch (e) {
            return res.status(400).json({
                message: "Given task does not exist!",
                data: null
            })
        }
    }
}

module.exports = new GroupIdPatchController();