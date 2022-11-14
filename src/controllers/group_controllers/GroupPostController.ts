import {Request, Response} from "express";
const Group = require('../../models/Group');

class GroupPostController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async postGroup(req: Request, res: Response) {
        console.log(req.body);
        const newGroup = new Group(req.body);
        try {
            const saveRes = await newGroup.save();
            console.log(saveRes)
            return res.status(201).json({
                message: "Group created!",
                data: saveRes
            });
        }
        catch (e:any) {
            var err_msg = "";
            console.log(e.errors)
            if (e.errors.name) {
                err_msg += e.errors.name.properties.message;
            }
            console.log(err_msg);
            res.status(400);
            return res.json({
                message: err_msg,
                data: null
            });
        }
    }
}

export = new GroupPostController();