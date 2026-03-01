/**
 * Email template for contact form submissions
 * Generates HTML email with client inquiry information
 */

// Format values for display
const formatValue = (value) => {
	if (!value) return "Not specified";
	if (typeof value === "string") {
		return value
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	}
	return value;
};

const formatGoals = (goalsArray) => {
	if (!goalsArray || goalsArray.length === 0) return "Not specified";
	return goalsArray.map((goal) => formatValue(goal)).join(", ");
};

export const generateContactFormEmail = (data, options = {}) => {
	const {
		fullName,
		email,
		phone,
		hasCoach,
		workoutDays,
		goals,
		needsMealPlan,
		coachingPreference,
		locationPreference,
		trainerPreference,
	} = data;

	// For testing, use localhost. For production emails, use the full domain
	const isProduction = options.isProduction || false;
	const baseUrl = isProduction 
		? (process.env.NEXT_PUBLIC_BASE_URL || "https://momuscle.com")
		: (typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000");

	return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #0283C0 0%, #016a9e 100%);
            padding: 40px 20px;
            text-align: center;
        }
        .logo {
            max-width: 150px;
            height: auto;
        }
        .content {
            padding: 40px 30px;
        }
        .title {
            color: #050508;
            font-size: 24px;
            font-weight: bold;
            margin: 0 0 10px 0;
            text-align: center;
        }
        .subtitle {
            color: #666;
            font-size: 14px;
            text-align: center;
            margin: 0 0 30px 0;
        }
        .section {
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 20px;
        }
        .section-title {
            color: #0283C0;
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 20px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #0283C0;
            padding-bottom: 10px;
        }
        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            color: #6b7280;
            font-size: 14px;
            font-weight: 600;
            min-width: 180px;
        }
        .info-value {
            color: #111827;
            font-size: 14px;
            flex: 1;
        }
        .goals-list {
            color: #111827;
            font-size: 14px;
        }
        .highlight {
            background-color: #F5A623;
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-weight: 600;
        }
        .footer {
            background-color: #050508;
            color: #9ca3af;
            text-align: center;
            padding: 30px 20px;
            font-size: 12px;
        }
        .footer-brand {
            color: #0283C0;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
        }
        @media only screen and (max-width: 600px) {
            .content {
                padding: 30px 20px;
            }
            .section {
                padding: 20px;
            }
            .info-row {
                flex-direction: column;
            }
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header with Logo -->
        <div class="header">
            <img src="${baseUrl}/badge_logo_white.png" alt="Mo Muscle Logo" class="logo">
        </div>
        
        <!-- Content -->
        <div class="content">
            <h1 class="title">New Client Inquiry</h1>
            <p class="subtitle">You have received a new contact form submission</p>
            
            <!-- Contact Information Section -->
            <div class="section">
                <h2 class="section-title">📋 Contact Information</h2>
                <div class="info-row">
                    <div class="info-label">Full Name:</div>
                    <div class="info-value"><strong>${fullName}</strong></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Email Address:</div>
                    <div class="info-value"><a href="mailto:${email}" style="color: #0283C0; text-decoration: none;">${email}</a></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Phone Number:</div>
                    <div class="info-value"><a href="tel:${phone}" style="color: #0283C0; text-decoration: none;">${phone}</a></div>
                </div>
            </div>
            
            <!-- Training Preferences Section -->
            <div class="section">
                <h2 class="section-title">💪 Training Preferences</h2>
                <div class="info-row">
                    <div class="info-label">Trainer Preference:</div>
                    <div class="info-value"><span class="highlight">${formatValue(trainerPreference)}</span></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Coaching Type:</div>
                    <div class="info-value">${formatValue(coachingPreference)}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Location Preference:</div>
                    <div class="info-value">${formatValue(locationPreference)}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Workouts Per Week:</div>
                    <div class="info-value">${workoutDays} day(s)</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Previous Coach Experience:</div>
                    <div class="info-value">${formatValue(hasCoach)}</div>
                </div>
            </div>
            
            <!-- Goals & Nutrition Section -->
            <div class="section">
                <h2 class="section-title">🎯 Goals & Nutrition</h2>
                <div class="info-row">
                    <div class="info-label">Fitness Goals:</div>
                    <div class="info-value goals-list">${formatGoals(goals)}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Meal Plan Required:</div>
                    <div class="info-value">${formatValue(needsMealPlan)}</div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-brand">MO MUSCLE</div>
            <p>This email was sent from your website contact form.</p>
        </div>
    </div>
</body>
</html>
`;
};

// Plain text version for email clients that don't support HTML
export const generateContactFormEmailText = (data) => {
	const {
		fullName,
		email,
		phone,
		hasCoach,
		workoutDays,
		goals,
		needsMealPlan,
		coachingPreference,
		locationPreference,
		trainerPreference,
	} = data;

	return `Name: ${fullName}
Email: ${email}
Phone Number: ${phone}
Have they had a coach before? ${formatValue(hasCoach)}
How many days they prefer working out: ${workoutDays}
Their list of goals: ${formatGoals(goals)}
Do they need a meal plan? ${formatValue(needsMealPlan)}
Trainer Preference is: ${formatValue(trainerPreference)}
Location Preference: ${formatValue(locationPreference)}
Coaching Preference is: ${formatValue(coachingPreference)}`;
};
