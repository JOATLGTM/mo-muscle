import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
	generateContactFormEmail,
	generateContactFormEmailText,
} from "@/lib/email-templates/contact-form-template";

export async function POST(req) {
	try {
		const formData = await req.json();
		const {
			email,
			trainerPreference,
		} = formData;

		// Generate email content from template (with production flag for proper URL)
		const htmlContent = generateContactFormEmail(formData, { isProduction: true });
		const textContent = generateContactFormEmailText(formData);

		const recipients =
			trainerPreference === "brie-miller"
				? [
						{
							user: process.env.EMAIL_USER_2,
							pass: process.env.MAIL_PASS_2,
						},
						{
							user: process.env.EMAIL_USER,
							pass: process.env.MAIL_PASS,
						},
				  ]
				: [
						{
							user: process.env.EMAIL_USER,
							pass: process.env.MAIL_PASS,
						},
				  ];

		for (const recipient of recipients) {
			const transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false,
				auth: {
					user: recipient.user,
					pass: recipient.pass,
				},
			});

			const mailOptions = {
				from: email,
				to: recipient.user,
				subject: "New Contact Form Submission",
				text: textContent,
				html: htmlContent,
			};

			await transporter.sendMail(mailOptions);
		}

		return NextResponse.json(
			{ message: "Email sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ error: "Failed to send email" },
			{ status: 500 }
		);
	}
}
