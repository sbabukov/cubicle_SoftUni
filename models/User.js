const mongoose = require('mongoose');

// създаваме си схемата за монгуза, тук могат да се добавят и валидации
const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// експортва се User като се подава и неговата схема
module.exports = mongoose.model('User', userSchema);