const Group = require('../../models/Group');

class GroupIdGetController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async getIdGroup(req:any, res: any){
        try{
            const group = await Group.find({_id: req.params.id})
                .select(req.query.select == null ? {} : JSON.parse(req.query.select))
            if (group.length === 0) {
                return res.status(404).json({
                    message: "Group not found!",
                    data: null
                })
            }
            else {
                res.status(200);
                res.json({
                    message: "OK",
                    data: group
                })
            }
        }
        catch (error) {
            return res.status(404).json({
                message: "Group not found!",
                data: null
            })
        }
    }
}

export = new GroupIdGetController();