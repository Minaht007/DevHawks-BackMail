const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
	},
});

app.post("/send", (req, res) => {
	const { to, subject, text } = req.body;

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: to,
		subject: subject,
		text: text,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).json({ message: "Reject send.", error });
		}
		res.status(200).json({ message: "Success send.", info });
	});
});

app.listen(port, () => {
	console.log(`Server starting on Port: ${port}`);
});
