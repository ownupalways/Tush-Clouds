import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";
import { Resend } from "resend";
import { ReviewNotificationEmail } from "@/app/email/ReviewNotification";

const resend = new Resend(
	process.env.RESEND_API_KEY,
);

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, rating, comment, category } =
			body;
		if (!name || !rating || !comment)
			return NextResponse.json(
				{ error: "Missing fields" },
				{ status: 400 },
			);

		await connectDB();
		const review = await Review.create({
			name,
			rating,
			comment,
			category,
			approved: false,
		});

		// Send email notification
		try {
			await resend.emails.send({
				from: "Tush-Cloud <onboarding@resend.dev>",
				to: ["oluwadipegodwin@gmail.com"],
				subject: `⭐ New Review from ${name} — Needs Approval`,
				react: ReviewNotificationEmail({
					name,
					rating,
					comment,
					category,
				}),
			});
		} catch (emailError) {
			console.error(
				"Email notification failed:",
				emailError,
			);
		}

		return NextResponse.json(
			{ success: true, data: review },
			{ status: 201 },
		);
	} catch (error) {
		console.error(
			"POST Error:",
			error instanceof Error
				? error.message
				: error,
		);
		return NextResponse.json(
			{ error: "Submission failed" },
			{ status: 500 },
		);
	}
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const showAll =
			searchParams.get("all") === "true";
		const filter = showAll
			? {}
			: { approved: true };

		await connectDB();
		const reviews = await Review.find(filter)
			.sort({ createdAt: -1 })
			.lean();
		return NextResponse.json(
			{ success: true, data: reviews },
			{ status: 200 },
		);
	} catch (error) {
		console.error(
			"GET Error:",
			error instanceof Error
				? error.message
				: error,
		);
		return NextResponse.json(
			{ error: "Fetch failed" },
			{ status: 500 },
		);
	}
}

export async function PATCH(request: Request) {
	const session =
		await getServerSession(authOptions);
	if (!session)
		return NextResponse.json(
			{ error: "Unauthorized" },
			{ status: 401 },
		);

	try {
		const { id, approved } = await request.json();
		await connectDB();
		const updated =
			await Review.findByIdAndUpdate(
				id,
				{ approved },
				{ new: true },
			);
		return NextResponse.json(
			{ success: true, data: updated },
			{ status: 200 },
		);
	} catch (error) {
		console.error(
			"PATCH Error:",
			error instanceof Error
				? error.message
				: error,
		);
		return NextResponse.json(
			{ error: "Update failed" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: Request) {
	const session =
		await getServerSession(authOptions);
	if (!session)
		return NextResponse.json(
			{ error: "Unauthorized" },
			{ status: 401 },
		);

	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		await connectDB();
		await Review.findByIdAndDelete(id);
		return NextResponse.json(
			{ success: true, message: "Deleted" },
			{ status: 200 },
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: "Delete failed" },
			{ status: 500 },
		);
	}
}
