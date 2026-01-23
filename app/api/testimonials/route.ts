import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

// POST - Create a new testimonial
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const {
			name,
			position,
			company,
			message,
			rating,
			image,
		} = body;

		// Validate required fields
		if (!name || !message) {
			return NextResponse.json(
				{
					error: "Name and message are required",
				},
				{ status: 400 },
			);
		}

		// Validate rating if provided
		if (rating && (rating < 1 || rating > 5)) {
			return NextResponse.json(
				{
					error: "Rating must be between 1 and 5",
				},
				{ status: 400 },
			);
		}

		await connectDB();

		const testimonial = await Testimonial.create({
			name,
			position,
			company,
			message,
			rating: rating || 5,
			image,
			approved: false, // Requires admin approval
		});

		return NextResponse.json(
			{
				success: true,
				message:
					"Testimonial submitted successfully. Pending approval.",
				data: testimonial,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error(
			"Error creating testimonial:",
			error,
		);
		return NextResponse.json(
			{ error: "Failed to submit testimonial" },
			{ status: 500 },
		);
	}
}

// GET - Retrieve testimonials
export async function GET(request: Request) {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const showAll =
			searchParams.get("all") === "true";

		// If showAll=true, return all testimonials (for admin)
		// Otherwise, only return approved testimonials (for public)
		interface FilterType {
			approved?: boolean;
		}

		const filter: FilterType = showAll
			? {}
			: { approved: true };

		const testimonials = await Testimonial.find(
			filter,
		).sort({
			createdAt: -1,
		});

		return NextResponse.json(
			{
				success: true,
				count: testimonials.length,
				data: testimonials,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error(
			"Error fetching testimonials:",
			error,
		);
		return NextResponse.json(
			{ error: "Failed to fetch testimonials" },
			{ status: 500 },
		);
	}
}

// PATCH - Update testimonial (approve/reject)
export async function PATCH(request: Request) {
	try {
		const body = await request.json();
		const { id, approved } = body;

		if (!id) {
			return NextResponse.json(
				{ error: "Testimonial ID is required" },
				{ status: 400 },
			);
		}

		await connectDB();

		const testimonial =
			await Testimonial.findByIdAndUpdate(
				id,
				{ approved },
				{ new: true },
			);

		if (!testimonial) {
			return NextResponse.json(
				{ error: "Testimonial not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: `Testimonial ${approved ? "approved" : "rejected"}`,
				data: testimonial,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error(
			"Error updating testimonial:",
			error,
		);
		return NextResponse.json(
			{ error: "Failed to update testimonial" },
			{ status: 500 },
		);
	}
}

// DELETE - Delete a testimonial
export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Testimonial ID is required" },
				{ status: 400 },
			);
		}

		await connectDB();

		const testimonial =
			await Testimonial.findByIdAndDelete(id);

		if (!testimonial) {
			return NextResponse.json(
				{ error: "Testimonial not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				message:
					"Testimonial deleted successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error(
			"Error deleting testimonial:",
			error,
		);
		return NextResponse.json(
			{ error: "Failed to delete testimonial" },
			{ status: 500 },
		);
	}
}
