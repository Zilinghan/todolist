// Mongoose Schema for the User

const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: 'Username is required!'},
    email: {type: String, required: 'User email is required!', unique: true},
    individualTasks: [String],
    belongingGroups: [String],
    unreadTasks: [String],
    invitingGroups: [String],
    invitingLeadingGroups: [String],
    description: String,
    image:  {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('User', userSchema);