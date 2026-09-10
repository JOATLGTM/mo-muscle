import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
	generateScholarshipEmail,
	generateScholarshipEmailText,
	SCHOLARSHIP_QUESTIONS,
} from "@/lib/email-templates/scholarship-application-template";

const REQUIRED_FIELDS = [
	"fullName",
	"email",
	"phone",
	"age",
	...SCHOLARSHIP_QUESTIONS.map((q) => q.id),
];

export async function POST(req) {
	try {
		const formData = await req.json();

		const missing = REQUIRED_FIELDS.filter(
			(field) => !String(formData[field] ?? "").trim()
		);
		if (missing.length > 0) {
			return NextResponse.json(
				{ error: `Missing required fields: ${missing.join(", ")}` },
				{ status: 400 }
			);
		}

		const htmlContent = generateScholarshipEmail(formData, {
			isProduction: true,
		});
		const textContent = generateScholarshipEmailText(formData);

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			replyTo: formData.email,
			to: process.env.EMAIL_USER,
			subject: `Shawna Miller Scholarship Application - ${formData.fullName}`,
			text: textContent,
			html: htmlContent,
		});

		return NextResponse.json(
			{ message: "Application submitted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending scholarship application:", error);
		return NextResponse.json(
			{ error: "Failed to submit application" },
			{ status: 500 }
		);
	}
}
