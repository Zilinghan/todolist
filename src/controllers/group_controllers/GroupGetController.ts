const Group = require('../../models/Group');

class GroupGetController {
    async getGroup(req:any, res: any){
        try{
            const group = await Group.find(req.query.where == null ? {} : JSON.parse(req.query.where))
                .limit(parseInt(req.query.limit))
                .select(req.query.select == null ? {} : JSON.parse(req.query.select))
                .sort(req.query.sort == null ? {} : JSON.parse(req.query.sort))
                .skip(req.query.skip == null ? 0 : parseInt(req.query.skip));
            if (group.length === 0) {
                return res.status(404).json({message: "Group not found!", data: null});
            }
            else {
                return res.status(200).json({message: "OK", data: group});
            }
        }
        catch (error) {
            return res.status(500).json({message: "Sorry, we meet some sever error for getting you the data.", data: null});
        }
    }
}

export = new GroupGetController();