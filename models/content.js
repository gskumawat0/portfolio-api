const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema({
	name: String,
	email: String,
	subject: String,
	message: String,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Content", contentSchema, "contents");
