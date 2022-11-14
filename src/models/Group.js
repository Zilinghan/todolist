// Mongoose Schema for the User

const mongoose =  require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {type: String, required: 'Group name is required!'},
    description: {type: String, default: 'Group leaders have not added a group description.'},
    leaders: [String],
    pendingLeaders: [String],
    members: [String],
    pendingMembers: [String],
    groupTasks: [String]
})

module.exports = mongoose.model('Group', groupSchema);