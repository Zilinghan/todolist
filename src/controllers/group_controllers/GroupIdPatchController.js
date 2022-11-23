const User = require('../../models/User.js');
const Task = require('../../models/Task.js');
const Group = require('../../models/Group.js');

class GroupIdPatchController {
    async patchIdGroup(req, res){
        try {
            if (req.body.leaders) {
                const leader = await User.find({_id: req.body.leaders}).select({_id: 1});
                if (leader.length === 0) {
                    return res.status(400).json({
                        message: "Given leader does not exist!",
                        data: null
                    })
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {leaders: req.body.leaders}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {leaders: req.body.leaders}});
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
        }
        catch (e) {
            return res.status(400).json({
                message: "Given leader does not exist!",
                data: null
            })
        }
        try {
            if (req.body.pendingLeaders) {
                const leader = await User.find({_id: req.body.pendingLeaders}).select({_id: 1});
                if (leader.length === 0) {
                    return res.status(400).json({
                        message: "Given leader does not exist!",
                        data: null
                    })
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {pendingLeaders: req.body.pendingLeaders}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {pendingLeaders: req.body.pendingLeaders}});
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
        }
        catch (e) {
            return res.status(400).json({
                message: "Given leader does not exist!",
                data: null
            })
        }
        try {
            if (req.body.members) {
                const member = await User.find({_id: req.body.members}).select({_id: 1});
                if (member.length === 0) {
                    return res.status(400).json({
                        message: "Given member does not exist!",
                        data: null
                    })
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {members: req.body.members}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {members: req.body.members}});
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
        }
        catch (e) {
            return res.status(400).json({
                message: "Given member does not exist!",
                data: null
            })
        }
        try {
            if (req.body.pendingMembers) {
                const member = await User.find({_id: req.body.pendingMembers}).select({_id: 1});
                if (member.length === 0) {
                    return res.status(400).json({
                        message: "Given member does not exist!",
                        data: null
                    })
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {pendingMembers: req.body.pendingMembers}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {pendingMembers: req.body.pendingMembers}});
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
        }
        catch (e) {
            return res.status(400).json({
                message: "Given member does not exist!",
                data: null
            })
        }
        try {
            if (req.body.groupTasks) {
                const task = await Task.find({_id: req.body.groupTasks}).select({_id: 1});
                if (task.length === 0) {
                    return res.status(400).json({
                        message: "Given task does not exist!",
                        data: null
                    })
                }
                else {
                    if (req.body.operation === 'add') {
                        await Group.updateOne({_id: req.params.id}, {$addToSet: {groupTasks: req.body.groupTasks}});
                        return res.status(200).json({
                            message: "Success!",
                            data: null
                        })
                    }
                    else if (req.body.operation === 'remove') {
                        await Group.updateOne({_id: req.params.id}, {$pull: {groupTasks: req.body.groupTasks}});
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