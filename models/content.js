const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentSchema = new Schema({
	meta: {
		title: String,
		description: String,
		ogTitle: String,
		ogDescription: String,
		ogUrl: String,
		ogImage: String,
		favIcon: String,
	},
	header: {
		headline: String,
		subHeadline: String,
		backgroundImg: String,
	},
	about: {
		headline: String,
		description: String,
		avatar: String,
	},
	portfolio: {
		headline: String,
		projects: [
			{
				thumbnail: String,
				title: String,
				description: String,
				tools: [{ color: String, src: String, title: String }],
				viewText: String,
				link: String,
				priority: Number
			},
		],
	},
	others: {
		headline: String,
		recentlyRead: [
			{
				title: String,
				author: String,
				link: String,
			},
		],
		quotes: [
			{
				quote: String,
				author: String,
			},
		],
		resources: [
			{
				resource: String,
				platform: String,
				link: String,
			},
		],
	},
	contactForm: {
		headline: String,
		subHeadline: String,
	},
	social: [
		{
			name: String,
			link: String,
			src: String,
		},
	],
	lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Content", contentSchema, "contents");
