// const { NextResponse } = require("next/server");
// const Stripe = require("stripe");

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
// 	apiVersion: "2023-10-16",
// });

// if (!process.env.STRIPE_SECRET_KEY) {
// 	throw new Error(
// 		"STRIPE_SECRET_KEY is not set in the environment variables"
// 	);
// }

// async function POST(req) {
// 	const { priceId } = await req.json();

// 	try {
// 		const session = await stripe.checkout.sessions.create({
// 			payment_method_types: ["card"],
// 			line_items: [
// 				{
// 					price: priceId,
// 					quantity: 1,
// 				},
// 			],
// 			mode: "subscription",
// 			success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
// 			cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
// 		});

// 		return NextResponse.json({ sessionId: session.id });
// 	} catch (err) {
// 		console.error("Error creating checkout session:", err);
// 		return NextResponse.json(
// 			{ error: { message: err.message } },
// 			{ status: 500 }
// 		);
// 	}
// }

// module.exports = { POST };
