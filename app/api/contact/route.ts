import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

/**
 * 🚀 CRITICAL FOR PERFORMANCE
 * This route must always be dynamic
 */
export const dynamic = "force-dynamic";

/**
 * Ensures stable runtime for MongoDB
 */
export const runtime = "nodejs";

/**
 * POST — Create new contact message
 */
export async function POST(request: Request) {
	try {
		// Guard against empty or invalid body
		const contentType = request.headers.get(
			"content-type",
		);

		if (
			!contentType ||
			!contentType.includes("application/json")
		) {
			return NextResponse.json(
				{ error: "Invalid request format" },
				{ status: 400 },
			);
		}

		const body = await request.json();
		const { name, email, message } = body ?? {};

		// Validate required fields
		if (
			!name ||
			!email ||
			!message ||
			typeof name !== "string" ||
			typeof email !== "string" ||
			typeof message !== "string"
		) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 },
			);
		}

		// Email format validation
		const emailRegex =
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 },
			);
		}

		// Connect once (cached internally)
		await connectDB();

		const contact = await Contact.create({
			name: name.trim(),
			email: email.trim().toLowerCase(),
			message: message.trim(),
			status: "new",
		});

		return NextResponse.json(
			{
				success: true,
				message: "Message sent successfully",
				id: contact._id,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Contact POST error:", error);

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

/**
 * GET — Admin-only contact fetch
 * (Should be protected later with auth)
 */
export async function GET() {
	try {
		await connectDB();

		const contacts = await Contact.find()
			.sort({ createdAt: -1 })
			.limit(50)
			.lean(); // ⚡ performance boost

		return NextResponse.json(
			{
				success: true,
				count: contacts.length,
				data: contacts,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Contact GET error:", error);

		return NextResponse.json(
			{ error: "Failed to fetch contacts" },
			{ status: 500 },
		);
	}
}
