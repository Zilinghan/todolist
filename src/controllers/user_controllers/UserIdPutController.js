const User = require('../../models/User');

class UserIdPutController {
    async putIdUser(req, res){
        /* For user, the PUT method is only used for changing the username, description, and image of a person.
        *  It does not check the two-way reference pointer, so it cannot change the individual tasks, belonging groups, etc.
        * */
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
                return res.status(404).json({message: "User not found!", data: null});
            }
            return res.status(200).json({message: "Success", data: null});
        }
        catch (e) {
            return res.status(404).json({message: "User not found!", data: null});
        }
    }
}

module.exports = new UserIdPutController();