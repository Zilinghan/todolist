const User = require('../../models/User');

class UserIdGetController {
    defaultMethod() {
        return {
            text: `You've reached the ${this.constructor.name} default method`
        };
    }

    async getIdUser(req:any, res: any){
        try{
            const user = await User.find({_id: req.params.id})
                .select(req.query.select == null ? {} : JSON.parse(req.query.select))
            if (user.length === 0) {
                return res.status(404).json({
                    message: "User not found!",
                    data: null
                })
            }
            else {
                res.status(200);
                res.json({
                    message: "OK",
                    data: user
                })
            }
        }
        catch (error) {
            console.log(error);
            return res.status(404).json({
                message: "User not found!",
                data: null
            })
        }
    }
}

export = new UserIdGetController();