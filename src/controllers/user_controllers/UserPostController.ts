import {Request, Response} from "express";

const User = require('../models/User');

class UserPostController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async postUser(req: Request, res: Response) {
        console.log(req.body);
        const newUser = new User(req.body);
        try {
            const saveRes = await newUser.save();
            console.log(saveRes)
            return res.status(201).json({
                message: "User created!",
                data: saveRes
            });
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
            console.log(err_msg);
            return res.status(400).json({
                message: err_msg,
                data: null
            });
        }
    }

}

export = new UserPostController();