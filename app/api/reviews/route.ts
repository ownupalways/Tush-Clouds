import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";

interface ReviewFilter {
	approved?: boolean;
	category?: string;
	targetType?: "service" | "course" | "portfolio";
	targetId?: string;
}

/**
 * 🚀 PERFORMANCE FLAGS
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * POST – Create review
 */
export async function POST(request: Request) {
	try {
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
		const {
			name,
			email,
			rating,
			comment,
			category,
			targetType,
			targetId,
		} = body ?? {};

		if (
			!name ||
			!comment ||
			typeof rating !== "number"
		) {
			return NextResponse.json(
				{
					error:
						"Name, rating, and comment are required",
				},
				{ status: 400 },
			);
		}

		if (rating < 1 || rating > 5) {
			return NextResponse.json(
				{
					error: "Rating must be between 1 and 5",
				},
				{ status: 400 },
			);
		}

		await connectDB();

		const review = await Review.create({
			name: name.trim(),
			email:
				typeof email === "string"
					? email.trim().toLowerCase()
					: undefined,
			rating,
			comment: comment.trim(),
			category: category || "other",
			targetType,
			targetId,
			approved: false,
		});

		return NextResponse.json(
			{
				success: true,
				message:
					"Review submitted successfully. Pending approval.",
				data: review,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error(
			"Error creating review:",
			error,
		);

		return NextResponse.json(
			{ error: "Failed to submit review" },
			{ status: 500 },
		);
	}
}

/**
 * GET – Retrieve reviews
 */
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const showAll =
			searchParams.get("all") === "true";
		const category = searchParams.get("category");

		const page =
			Number(searchParams.get("page")) || 0;
		const limit = 20;

		const filter: ReviewFilter = showAll
			? {}
			: { approved: true };

		if (category) filter.category = category;

		await connectDB();

		const [reviews, stats] = await Promise.all([
			Review.find(filter)
				.sort({ createdAt: -1 })
				.skip(page * limit)
				.limit(limit)
				.lean(),
			Review.aggregate([
				{ $match: { approved: true } },
				{
					$group: {
						_id: null,
						avgRating: {
							$avg: "$rating",
						},
					},
				},
			]),
		]);

		const avgRating =
			stats.length > 0
				? Number(stats[0].avgRating.toFixed(1))
				: 0;

		return NextResponse.json(
			{
				success: true,
				count: reviews.length,
				averageRating: avgRating,
				data: reviews,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error(
			"Error fetching reviews:",
			error,
		);

		return NextResponse.json(
			{ error: "Failed to fetch reviews" },
			{ status: 500 },
		);
	}
}

/**
 * PATCH – Update review approval
 */
export async function PATCH(request: Request) {
	try {
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
		const { id, approved } = body ?? {};

		if (!id || typeof id !== "string") {
			return NextResponse.json(
				{ error: "Review ID is required" },
				{ status: 400 },
			);
		}

		if (typeof approved !== "boolean") {
			return NextResponse.json(
				{
					error:
						"Approved status must be a boolean",
				},
				{ status: 400 },
			);
		}

		await connectDB();

		const review = await Review.findByIdAndUpdate(
			id,
			{ approved },
			{ new: true },
		);

		if (!review) {
			return NextResponse.json(
				{ error: "Review not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: `Review ${
					approved ? "approved" : "unapproved"
				} successfully`,
				data: review,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error(
			"Error updating review:",
			error,
		);

		return NextResponse.json(
			{ error: "Failed to update review" },
			{ status: 500 },
		);
	}
}

/**
 * DELETE – Remove review
 */
export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Review ID is required" },
				{ status: 400 },
			);
		}

		await connectDB();

		const review =
			await Review.findByIdAndDelete(id);

		if (!review) {
			return NextResponse.json(
				{ error: "Review not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Review deleted successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error(
			"Error deleting review:",
			error,
		);

		return NextResponse.json(
			{ error: "Failed to delete review" },
			{ status: 500 },
		);
	}
}
