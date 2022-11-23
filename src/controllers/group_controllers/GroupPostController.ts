import {Request, Response} from "express";
const Group = require('../../models/Group');

class GroupPostController {
    async postGroup(req: Request, res: Response) {
        /* For group, the POST method creates a group with its name and description (optional)
        *  Specifically, POST does not deal with the two-way reference, so you should not initialize other properties here.
        *  Therefore, for the front-end, if a user creates a new group, the front end should call this POST-group, and then
        *  PATCH himself/herself as the group leader.
        * */
        const newGroup = new Group(req.body);
        try {
            const saveRes = await newGroup.save();
            return res.status(201).json({message: "Group created!", data: saveRes});
        }
        catch (e:any) {
            var err_msg = "";
            if (e.errors.name) {
                err_msg += e.errors.name.properties.message;
            }
            return res.status(400).json({message: err_msg, data: null});
        }
    }
}

export = new GroupPostController();