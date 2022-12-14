const Group = require('../../models/Group');

class GroupIdGetController {
    async getIdGroup(req:any, res: any){
        try{
            const group = await Group.find({_id: req.params.id}).select(req.query.select == null ? {} : JSON.parse(req.query.select));
            if (group.length === 0) {
                return res.status(404).json({message: "Group not found!", data: null});
            }
            else {
                return res.status(200).json({message: "OK", data: group});
            }
        }
        catch (error) {
            return res.status(404).json({message: "Group not found!", data: null});
        }
    }
}

export = new GroupIdGetController();