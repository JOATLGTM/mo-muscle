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

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		const mailOptions = {
			from: email,
			to:
				trainerPreference === "mo-nayal" || "no-preference"
					? process.env.EMAIL_USER
					: process.env.EMAIL_USER_2,
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
