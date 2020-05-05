const axios = require("axios");
const { RECAPTCHA_SECRET: recaptchaSecret } = process.env;

const verifyRecaptcha = async (token, ip) => {
	const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}&remoteip=${ip}`;
	return axios.post(verifyUrl);
};

module.exports = verifyRecaptcha;
