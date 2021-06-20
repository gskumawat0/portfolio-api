const axios = require("axios");

const { MSG91_AUTHKEY: authKey, MSG_SENDER_ID: defaultSenderId } = process.env;

const sendMessage = ({ sender = defaultSenderId, message, receiver }) => {
	return axios.post({
		url: "https://api.msg91.com/api/v2/sendsms",
		data: {
			sender,
			route: 4,
			country: "91",
			unicode: 1,
			sms: [
				{
					message,
					to: [receiver],
				},
			],
		},
		headers: {
			authkey: "333189AFS6dvW8I5eef40b9P1",
			"Content-Type": "application/json",
		},
	});
};

sendMessage({ sender: "BOOKMAN", message: "hello from msg ", receiver: "8890232339" });
