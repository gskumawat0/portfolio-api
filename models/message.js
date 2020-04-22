const mongoose = require("mongoose");
const { Schema } = mongoose;

const msgSchema = new Schema({
	name: String,
	email: String,
	subject: String,
	message: String,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", msgSchema, "messages");
