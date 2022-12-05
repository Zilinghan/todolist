const User = require('../../models/User');


class UserIdPutImageController {
    async putIdUserImage(req, res){
        try {
            const image = {image: new Buffer.from(req.file.buffer, 'base64'), contentType: req.file.mimetype};
            const user = await User.updateOne({_id: req.params.id}, image);
            if (user.matchedCount === 0) {
                return res.status(400).json({message: "User not found!", data: null});
            }
            return res.status(200).json({message: "Success", data: null});
        }
        catch (e) {
            return res.status(400).json({message: "User not found!", data: null});
        }
    }
}

module.exports = new UserIdPutImageController();