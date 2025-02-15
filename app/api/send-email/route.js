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
			trainerPreference,
		} = await req.json();

		let emailUser =
			trainerPreference === "brie-miller"
				? process.env.EMAIL_USER_2
				: process.env.EMAIL_USER;
		let emailPass =
			trainerPreference === "brie-miller"
				? process.env.MAIL_PASS_2
				: process.env.MAIL_PASS;

		console.log(`trainerPreference `, trainerPreference);
		console.log(emailUser, emailPass);

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: emailUser,
				pass: emailPass,
			},
		});

		const mailOptions = {
			from: email,
			to: emailUser,
			subject: "New Contact Form Submission",
			text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nhasCoach: ${hasCoach}\nworkoutDays: ${workoutDays}\ngoals: ${goals}\nneedsMealPlan: ${needsMealPlan}\ntrainerPreference: ${trainerPreference}\ncoachingPreference: ${coachingPreference}\nhasCoach: ${hasCoach}\n`,
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
