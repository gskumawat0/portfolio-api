const moment = require("moment");
const aws = require("aws-sdk");

const {
	AWS_ACCESS_KEY_ID: awsAccessKey,
	AWS_SECRET_ACCESS_KEY: awsSecretKey,
	DOMAIN_NAME: domain = "gskumawat.me",
	SES_REGION,
	SOURCEEMAIL,
	ADMIN_EMAIL = "gskumawat555@gmail.com",
} = process.env;

// aws s3 config
aws.config.update({
	accessKeyId: awsAccessKey,
	secretAccessKey: awsSecretKey,
	region: SES_REGION,
});

// Instantiate SES.
let ses = new aws.SES();

const setEmailParams = ({ ToAddresses, Source, ReplyToAddresses, subjectData, htmlData }) => {
	let params = {
		Destination: {
			ToAddresses,
		},
		Source,
		ReplyToAddresses,
		Message: {
			Body: {
				Html: {
					Data: htmlData,
				},
			},
			Subject: {
				Data: subjectData,
			},
		},
	};
	return params;
};

module.exports.sendContactEmailToAdmin = (message) => {
	try {
		let { _id, name, email, message: msg } = message;
		let ToAddresses = [ADMIN_EMAIL];
		let ReplyToAddresses = [`reply-${_id}@${domain}`];
		let Source = SOURCEEMAIL;
		let subjectData = `${name} message you at gskumawat.me`;
		let htmlData = `
			<html>
				<body>
				<p>Hi Gs,</p>
				<p>Hope you are doing well.</p>
				<p>${name} message you at gskumawat.me</p>
				<p><strong>Name: </strong> ${name}</p>
				<p><strong>Email: </strong> ${email}</p>
				<p><strong>Message: </strong> </p>
				<div style="padding-left: 20px;">
				${msg
					.split("\n")
					.filter(Boolean)
					.map((msgLine) => `<p>${msgLine}</p>`)}

				</div>
				<br />
				<br />
				<p>All the best for future endueavers</p>
				<p>Thank you</p>
				</body>
			</html>`;
		let params = setEmailParams({ Source, ReplyToAddresses, ToAddresses, htmlData, subjectData });
		return ses.sendEmail(params).promise();
	} catch (err) {
		console.log(err.message);
		return Promise.resolve();
	}
};
