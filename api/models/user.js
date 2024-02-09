const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    sentFriendRequets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

});

const User = mongoose.model("User", userSchema);
module.exports = User;