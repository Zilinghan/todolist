// Mongoose Schema for the User

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {type: String, required: 'Task name is required!'},
    description: {type: String, default: 'No description'},
    startTime: {type: Date, default: null},
    endTime: {type: Date, required: 'Task deadline is required! '},
    completed: {type: Boolean, default: false},
    assignedUser: {type: String, default: ""},
    assignedGroup: {type: String, default: ""}
})

module.exports = mongoose.model('Task', taskSchema);