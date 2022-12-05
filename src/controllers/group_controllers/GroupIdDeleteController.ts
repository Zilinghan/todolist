const Group = require('../../models/Group');
const User = require('../../models/User');
const Task = require('../../models/Task');

class GroupIdDeleteController {
    async deleteIdGroup(req:any, res: any){
        var group;
        try{
            group = await Group.find({_id: req.params.id});
            if (group.length === 0) {
                return res.status(404).json({message: "Group not found!", data: null});
            }
        }
        catch (error) {
            return res.status(404).json({message: "Group not found!", data: null});
        }
        /* Delete the group from the leaders */
        try {
            if (group[0].leaders.length != 0) {
                console.log(`Delete the leaders: ${group[0].leaders}`);
                await User.updateMany({_id: {$in: group[0].leaders}}, {$pull: {leadingGroups: req.params.id}});
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({message: "Internal error!", data: e});
        }
        /* Delete the group from the pendingLeaders */
        try {
            if (group[0].pendingLeaders.length != 0) {
                console.log(`Delete the pendingLeaders: ${group[0].pendingLeaders}`);
                await User.updateMany({_id: {$in: group[0].pendingLeaders}}, {$pull: {invitingLeadingGroups: req.params.id}});
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({message: "Internal error!", data: e});
        }
        /* Delete the group from the members */
        try {
            if (group[0].members.length != 0) {
                console.log(`Delete the members: ${group[0].members}`);
                await User.updateMany({_id: {$in: group[0].members}}, {$pull: {belongingGroups: req.params.id}});
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({message: "Internal error!", data: e});
        }
        /* Delete the group from the pendingMembers */
        try {
            if (group[0].pendingMembers.length != 0) {
                console.log(`Delete the pendingMembers: ${group[0].pendingMembers}`);
                await User.updateMany({_id: {$in: group[0].pendingMembers}}, {$pull: {invitingGroups: req.params.id}});
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({message: "Internal error!", data: e});
        }
        /* Delete all group tasks*/
        try {
            if (group[0].groupTasks.length != 0) {
                console.log(`Delete the groupTasks: ${group[0].groupTasks}`);
                await Task.deleteMany({_id: {$in: group[0].groupTasks}});
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({message: "Internal error!", data: e});
        }
        /* Delete the group itself */
        try {
            await Group.deleteOne({_id: req.params.id});
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({message: "Internal error!", data: e});
        }
        return res.status(200).json({message: "Success", data: null});
    }
}

export = new GroupIdDeleteController();