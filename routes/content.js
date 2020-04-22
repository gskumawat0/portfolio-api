const router = require("express").Router();

router.route("/").get(getPublicContent);

async function getPublicContent(req, res) {
	try {
		return res.json({
			message: "successfully sent my message",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
}
