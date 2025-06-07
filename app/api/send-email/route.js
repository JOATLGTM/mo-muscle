import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
	try {
		const {
			hasCoach,
			workoutDays,
			goals,
			needsMealPlan,
			coachingPreference,
			fullName,
			email,
			phone,
			locationPreference,
			trainerPreference,
		} = await req.json();

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
				text: `Name: ${fullName}\nEmail: ${email}\nPhone Number: ${phone}\nHave they had a coach before? ${hasCoach}\nHow many days they prefer working out: ${workoutDays}\nTheir list of goals: ${goals}\nDo they need a meal plan? ${needsMealPlan}\nTrainer Preference is: ${trainerPreference}\nLocation Preference: ${locationPreference}\nCoaching Preference is: ${coachingPreference}\n`,
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
