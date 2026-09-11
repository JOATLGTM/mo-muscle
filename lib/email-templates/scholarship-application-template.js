/**
 * Email template for Shawna Miller Scholarship applications
 */

const escapeHtml = (value) =>
	String(value ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

const formatMultiline = (value) =>
	escapeHtml(value || "Not provided").replace(/\n/g, "<br />");

const formatValue = (value) => {
	if (!value) return "Not specified";
	return String(value)
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export const SCHOLARSHIP_QUESTIONS = [
	{
		id: "healthChallenges",
		label: "Health challenges she is currently facing",
	},
	{
		id: "whyNow",
		label: "Why now is the right time to make a change",
	},
	{
		id: "whyDeserve",
		label: "Why she deserves the scholarship",
	},
	{
		id: "goals",
		label: "What she hopes to achieve in 6 months",
	},
	{
		id: "commitment",
		label: "How she will commit to showing up",
	},
];

export const generateScholarshipEmail = (data, options = {}) => {
	const {
		fullName,
		email,
		phone,
		age,
		isInColumbus,
		locationPreference,
		availability,
		referralSource,
	} = data;

	const isProduction = options.isProduction || false;
	const baseUrl = isProduction
		? process.env.NEXT_PUBLIC_BASE_URL || "https://www.trainmomuscle.com"
		: "http://localhost:3000";

	const answerSections = SCHOLARSHIP_QUESTIONS.map(
		(q) => `
            <div class="answer">
                <div class="answer-label">${q.label}</div>
                <div class="answer-value">${formatMultiline(data[q.id])}</div>
            </div>`
	).join("");

	return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Scholarship Application</title>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; }
        .email-container { max-width: 640px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #0283C0 0%, #016a9e 100%); padding: 40px 20px; text-align: center; }
        .logo { max-width: 150px; height: auto; }
        .content { padding: 40px 30px; }
        .title { color: #050508; font-size: 24px; font-weight: bold; margin: 0 0 10px 0; text-align: center; }
        .subtitle { color: #666; font-size: 14px; text-align: center; margin: 0 0 30px 0; }
        .section { background-color: #f9fafb; border-radius: 8px; padding: 25px; margin-bottom: 20px; }
        .section-title { color: #0283C0; font-size: 16px; font-weight: bold; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0283C0; padding-bottom: 10px; }
        .info-row { display: flex; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
        .info-row:last-child { border-bottom: none; }
        .info-label { color: #6b7280; font-size: 14px; font-weight: 600; min-width: 180px; }
        .info-value { color: #111827; font-size: 14px; flex: 1; }
        .answer { padding: 14px 0; border-bottom: 1px solid #e5e7eb; }
        .answer:last-child { border-bottom: none; }
        .answer-label { color: #0283C0; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .answer-value { color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
        .footer { background-color: #050508; color: #9ca3af; text-align: center; padding: 30px 20px; font-size: 12px; }
        .footer-brand { color: #0283C0; font-weight: bold; font-size: 16px; margin-bottom: 10px; }
        @media only screen and (max-width: 600px) {
            .content { padding: 30px 20px; }
            .section { padding: 20px; }
            .info-row { flex-direction: column; }
            .info-label { margin-bottom: 5px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="${baseUrl}/badge_logo_white.png" alt="Mo Muscle Logo" class="logo">
        </div>
        <div class="content">
            <h1 class="title">New Scholarship Application</h1>
            <p class="subtitle">A new application for the Shawna Miller Scholarship has been submitted</p>

            <div class="section">
                <h2 class="section-title">📋 Applicant Information</h2>
                <div class="info-row">
                    <div class="info-label">Full Name:</div>
                    <div class="info-value"><strong>${escapeHtml(fullName)}</strong></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Email Address:</div>
                    <div class="info-value"><a href="mailto:${escapeHtml(email)}" style="color: #0283C0; text-decoration: none;">${escapeHtml(email)}</a></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Phone Number:</div>
                    <div class="info-value"><a href="tel:${escapeHtml(phone)}" style="color: #0283C0; text-decoration: none;">${escapeHtml(phone)}</a></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Age:</div>
                    <div class="info-value">${escapeHtml(age)}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Located in Columbus, OH:</div>
                    <div class="info-value">${escapeHtml(formatValue(isInColumbus))}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Preferred Location:</div>
                    <div class="info-value">${escapeHtml(formatValue(locationPreference))}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Availability:</div>
                    <div class="info-value">${escapeHtml(formatValue(availability))}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">How They Heard About Us:</div>
                    <div class="info-value">${escapeHtml(referralSource || "Not specified")}</div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">💬 Her Story</h2>
                ${answerSections}
            </div>
        </div>
        <div class="footer">
            <div class="footer-brand">MO MUSCLE</div>
            <p>This email was sent from the Shawna Miller Scholarship application form.</p>
        </div>
    </div>
</body>
</html>
`;
};

export const generateScholarshipEmailText = (data) => {
	const {
		fullName,
		email,
		phone,
		age,
		isInColumbus,
		locationPreference,
		availability,
		referralSource,
	} = data;

	const answers = SCHOLARSHIP_QUESTIONS.map(
		(q) => `${q.label}:\n${data[q.id] || "Not provided"}`
	).join("\n\n");

	return `NEW SHAWNA MILLER SCHOLARSHIP APPLICATION

Name: ${fullName}
Email: ${email}
Phone: ${phone}
Age: ${age}
Located in Columbus, OH: ${formatValue(isInColumbus)}
Preferred Location: ${formatValue(locationPreference)}
Availability: ${formatValue(availability)}
How they heard about us: ${referralSource || "Not specified"}

${answers}`;
};
