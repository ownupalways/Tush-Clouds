import { NextResponse } from "next/server";
import { Resend } from "resend";
import clientPromise from "@/lib/mongodb-client";
import { ContactNotificationEmail } from "../../emails/ContactNotification";

// Initialize Resend - Ensure RESEND_API_KEY is in your .env file
const resend = new Resend(
	process.env.RESEND_API_KEY,
);

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, message } = body;

		// 1. Basic Validation: Ensure no empty fields are sent to DB
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// 2. Connect to MongoDB and Save the message
		const client = await clientPromise;
		const db = client.db("tush_cloud");

		const result = await db
			.collection("contacts")
			.insertOne({
				name,
				email,
				message,
				status: "new", // Default status for admin dashboard filtering
				createdAt: new Date().toISOString(),
			});

		// 3. Trigger Professional Email Notification via Resend
		if (result.acknowledged) {
			try {
				await resend.emails.send({
					// Use onboarding@resend.dev for testing; update to your domain later
					from: "Tush-Cloud <onboarding@resend.dev>",
					to: ["oluwadipegodwin@gmail.com"],
					subject: `🚀 New Lead: ${name}`,
					react: ContactNotificationEmail({
						name,
						email,
						message,
					}),
				});
			} catch (emailError: unknown) {
				// We log email failures but don't stop the request
				// because the lead is already safely in the Database.
				const msg =
					emailError instanceof Error
						? emailError.message
						: "Email service error";
				console.error(
					"Email notification failed:",
					msg,
				);
			}
		}

		return NextResponse.json(
			{ success: true, id: result.insertedId },
			{ status: 201 },
		);
	} catch (error: unknown) {
		// Strict TypeScript handling to avoid 'any' type
		const errorMessage =
			error instanceof Error
				? error.message
				: "Internal Server Error";
		console.error(
			"Submission API Error:",
			errorMessage,
		);

		return NextResponse.json(
			{ error: errorMessage },
			{ status: 500 },
		);
	}
}
