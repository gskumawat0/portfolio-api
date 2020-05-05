const mongoose = require("mongoose");
const { Schema } = mongoose;

const msgSchema = new Schema({
	name: String,
	email: String,
	message: String,
	date: { type: Date, default: Date.now },
	responses: [
		{
			sender: String,
			message: String,
			date: Date,
		},
	],
});

module.exports = mongoose.model("Message", msgSchema, "messages");
