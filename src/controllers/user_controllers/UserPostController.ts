import {Request, Response} from "express";
const User = require('../../models/User');

class UserPostController {
    async postUser(req: Request, res: Response) {
        /* For user, the POST method is used to create new user with certain necessary information such as name and email.
        *  It does not support two-way reference checking, so for properties such as individualTasks and belongGroups,
        *  they should not be initialized via the POST method.
        * */
        const newUser = new User(req.body);
        try {
            const saveRes = await newUser.save();
            return res.status(201).json({message: "User created!", data: saveRes});
        }
        catch (e:any) {
            var err_msg = "";
            if (!e.errors) {
                err_msg = "The email is already used!"
            }
            else {
                if (e.errors.email) {
                    err_msg += e.errors.email.properties.message;
                }
                if (e.errors.name) {
                    err_msg += e.errors.name.properties.message;
                }
            }
            return res.status(400).json({message: err_msg, data: null});
        }
    }
}

export = new UserPostController();