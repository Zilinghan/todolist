const User = require('../../models/User');

class UserIdPutController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async putIdUser(req, res){
        /* putIdUser only supports changing the username, user description, and user image */
        if (req.body.email) {
            delete req.body.email;
        }
        if (req.body.individualTasks) {
            delete req.body.individualTasks;
        }
        if (req.body.belongingGroups) {
            delete req.body.belongingGroups;
        }
        if (req.body.pendingMembers) {
            delete req.body.pendingMembers;
        }
        if (req.body.unreadTasks) {
            delete req.body.unreadTasks;
        }
         if (req.body.invitingGroups) {
            delete req.body.unreadTasks;
        }
        try {
            const user = await User.updateOne({_id: req.params.id}, req.body);
            if (user.matchedCount === 0) {
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

module.exports = new UserIdPutController();