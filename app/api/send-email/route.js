import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
	try {
		const { name, email, phone, service } = await req.json();

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.NEXT_PUBLIC_EMAIL_USER,
				pass: process.env.NEXT_PUBLIC_MAIL_PASS,
			},
		});

		// const mailOptions = {
		// 	from: process.env.NEXT_PUBLIC_EMAIL_USER,
		// 	to: "christopher.vo.h@gmail.com",
		// 	subject: "New Contact Form Submission",
		// 	text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}`,
		// };

		const mailOptions = {
			from: process.env.EMAIL_USER, // Use the sender's email from env
			to: "christopher.vo.h@gmail.com",
			subject: "New Contact Form Submission",
			text: `hey this worked. finally`,
		};

		await transporter.sendMail(mailOptions);
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
