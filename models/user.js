var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now }
}, { usePushEach: true });

module.exports = mongoose.model("User", userSchema);
