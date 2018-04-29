var config = require('../config/secret');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: config.MAIL_SERVICE,
	auth: {
		user: config.MAIL_USERNAME,
		pass: config.MAIL_PASSWORD
	}
});

var sendEmail = (to, subject, content) => {
	var mailOptions = {
		from: config.MAIL_USERNAME,
		to: to,
		subject: subject,
		text: content
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

module.exports = sendEmail;
