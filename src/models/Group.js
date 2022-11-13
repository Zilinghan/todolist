// Mongoose Schema for the User

import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name: {type: String, required: 'Group name is required!'},
    description: {type: String, default: 'Group leaders have not added a group description.'},
    leaders: [String],
    members: [String],
    groupTasks: [String]
})

module.exports = mongoose.model('Group', groupSchema);