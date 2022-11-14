const Group = require('../../models/Group');

class GroupIdPutController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async putIdGroup(req, res){
        /* putIdGroup only supports changing the group name and group description */
        if (req.body.leaders) {
            delete req.body.leaders;
        }
        if (req.body.pendingLeaders) {
            delete req.body.pendingLeaders;
        }
        if (req.body.members) {
            delete req.body.members;
        }
        if (req.body.pendingMembers) {
            delete req.body.pendingMembers;
        }
        if (req.body.groupTasks) {
            delete req.body.groupTasks;
        }
        try {
            const group = await Group.updateOne({_id: req.params.id}, req.body);
            if (group.matchedCount === 0) {
                return res.status(404).json({
                    message: "Group not found!",
                    data: null
                })
            }
            return res.status(200).json({
                message: "Success",
                data: null
            })
        }
        catch (e) {
            return res.status(404).json({
                message: "Group not found!",
                data: null
            })
        }
    }
}

module.exports = new GroupIdPutController();