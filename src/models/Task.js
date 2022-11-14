// Mongoose Schema for the User

const mongoose =  require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {type: String, required: 'Task name is required!'},
    description: {type: String, default: 'No description'},
    startTime: {type: Date, default: null},
    endTime: {type: Date, required: 'Task end time is required! '},
    completed: {type: Boolean, default: false},
    assignedUsers: {type: [String], default: []},
    assignedGroup: {type: String, default: ""}
})

module.exports = mongoose.model('Task', taskSchema);