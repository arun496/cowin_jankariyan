const mongoose = require("mongoose");

// Create User schema to set up in DB
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    }
});

let User = mongoose.model("user", userSchema);
module.exports = User;