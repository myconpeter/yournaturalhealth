import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/about', (req, res) => {
	res.render('about');
});
app.get('/contact', (req, res) => {
	res.render('contact');
});
app.get('/services', (req, res) => {
	res.render('services');
});
app.get('/teams', (req, res) => {
	res.render('teams');
});
// transporter

// Create a transporter using Gmail SMTP
let transporter = nodemailer.createTransport({
	host: 'live.smtp.mailtrap.io', // Use the correct SMTP host
	port: 2525, // Change to 2525, or 465/587 based on your Mailtrap settings
	secure: false, // Use true if you're using port 465
	auth: {
		user: 'smtp@mailtrap.io', // Replace with your Mailtrap username
		pass: '15a92777d0cd7c09f11e6bf6d5ba0ab0', // Replace with your Mailtrap password
	},
});

// verify transpoter

transporter.verify((error, success) => {
	if (error) {
		console.error(error);
	} else {
		console.log('success, ready for message');
	}
});

app.post('/send', (req, res) => {
	const { fullName, email, tel, address, message } = req.body;

	const mailOptions = {
		from: 'hi@susanmariealessio.online',
		to: 'michealpeter040@gmail.com',
		subject: 'Form Submission',
		html: `<h5> Full Name : ${fullName} </h5><h5> Email : ${email} </h5><h5> Phone Number : ${tel} </h5> <h5> Phone Number : ${address} </h5> `,
	};

	// Send the email
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log('Error sending email:', error);
			return res.status(500).send('Error sending email');
		} else {
			return res.render('success');
		}
	});
});

app.get('/sitemap', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'sitemap.xml'));
});

app.listen(PORT, () => {
	console.log(`app is connected to  port ${PORT}`);
});
