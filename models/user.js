var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
{
    name: String,
    username: String,
    message: String,
    date: { type: Date, default: Date.now }
}, { usePushEach: true });

module.exports = mongoose.model("User", userSchema);
