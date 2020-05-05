const router = require("express").Router();
const Content = require("../models/content");
const Message = require("../models/message");
const verifyRecaptcha = require("../services/verifyRecaptcha");
const emails = require("../services/emails");

router.route("/content").get(getPublicContent).post(addContent).put(updateContent);

async function getPublicContent(req, res) {
	try {
		const content = await Content.findOne({});
		return res.json({
			content,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
}

async function addContent(req, res) {
	try {
		let contentData = req.body;
		const content = await Content.create(contentData);
		return res.json({
			content,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
}

async function updateContent(req, res) {
	try {
		let contentData = req.body;
		const content = await Content.findOneAndUpdate({}, { $set: { ...contentData } });
		return res.json({
			content,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
}

router.route("/contact").post(submitContact);

async function submitContact(req, res) {
	try {
		let { token, name, email, message } = req.body;
		let { ip } = req;
		let verifyResponse = await verifyRecaptcha(token, ip);
		if (!verifyResponse.data.success) {
			throw Error("token validation failed due to:" + verifyResponse.data["error-codes"].join(", "));
		}

		let msg = await Message.create({ name, email, message, date: Date.now() });
		await emails.sendContactEmailToAdmin(msg);
		return res.json({
			message: `Thanks ${name} for Contacting us. We'll back to you in some time`,
			msg,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
}

module.exports = router;
