import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";

// POST - Create a new review
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const {
			name,
			email,
			rating,
			comment,
			category,
		} = body;

		// Validate required fields
		if (!name || !rating || !comment) {
			return NextResponse.json(
				{
					error:
						"Name, rating, and comment are required",
				},
				{ status: 400 },
			);
		}

		// Validate rating
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
			name,
			email,
			rating,
			comment,
			category: category || "other",
			approved: false, // Requires admin approval
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

// GET - Retrieve reviews
export async function GET(request: Request) {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const showAll =
			searchParams.get("all") === "true";
		const category = searchParams.get("category");

		// Build filter
		interface FilterType {
			approved?: boolean;
			category?: string;
		}

		const filter: FilterType = showAll
			? {}
			: { approved: true };
		if (category) {
			filter.category = category;
		}

		const reviews = await Review.find(
			filter,
		).sort({ createdAt: -1 });

		// Calculate average rating
		const avgRating =
			reviews.length > 0
				? reviews.reduce(
						(sum, review) => sum + review.rating,
						0,
					) / reviews.length
				: 0;

		return NextResponse.json(
			{
				success: true,
				count: reviews.length,
				averageRating: parseFloat(
					avgRating.toFixed(1),
				),
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

// PATCH - Update review (approve/reject)
export async function PATCH(request: Request) {
	try {
		const body = await request.json();
		const { id, approved } = body;

		if (!id) {
			return NextResponse.json(
				{ error: "Review ID is required" },
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
				message: `Review ${approved ? "approved" : "rejected"}`,
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

// DELETE - Delete a review
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
