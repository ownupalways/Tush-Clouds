import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

interface TestimonialApiResponse {
	_id: string;
	image?: string;
	name: string;
	position?: string;
	company?: string;
	message: string;
	rating?: number;
	featured?: boolean;
	approved?: boolean;
}

// Query filter interface
interface TestimonialFilter {
	approved?: boolean;
	featured?: boolean;
}

/**
 * 🚀 PERFORMANCE FLAGS
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET – Retrieve testimonials
 */
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const showAll =
			searchParams.get("all") === "true";
		const featured =
			searchParams.get("featured") === "true";

		const filter: TestimonialFilter = showAll
			? {}
			: { approved: true };
		if (featured) filter.featured = true;

		await connectDB();

		const testimonials = await Testimonial.find(
			filter,
		)
			.sort({ createdAt: -1 })
			.limit(featured ? 6 : 20)
			.lean<TestimonialApiResponse[]>(); // ⚡ faster and type-safe

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

/**
 * POST – Create testimonial
 */
export async function POST(request: Request) {
	try {
		const contentType = request.headers.get(
			"content-type",
		);
		if (
			!contentType?.includes("application/json")
		) {
			return NextResponse.json(
				{ error: "Invalid request format" },
				{ status: 400 },
			);
		}

		const body = await request.json();
		const { name, position, company, message } =
			body ?? {};

		if (
			!name ||
			!message ||
			typeof name !== "string" ||
			typeof message !== "string"
		) {
			return NextResponse.json(
				{
					error: "Name and message are required",
				},
				{ status: 400 },
			);
		}

		await connectDB();

		const testimonial = await Testimonial.create({
			name: name.trim(),
			position:
				typeof position === "string"
					? position.trim()
					: undefined,
			company:
				typeof company === "string"
					? company.trim()
					: undefined,
			message: message.trim(),
			approved: false,
			featured: false,
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

/**
 * PATCH – Update testimonial approval / featured
 */
export async function PATCH(request: Request) {
	try {
		const contentType = request.headers.get(
			"content-type",
		);
		if (
			!contentType?.includes("application/json")
		) {
			return NextResponse.json(
				{ error: "Invalid request format" },
				{ status: 400 },
			);
		}

		const body = await request.json();
		const { id, approved, featured } = body ?? {};

		if (!id || typeof id !== "string") {
			return NextResponse.json(
				{ error: "Testimonial ID is required" },
				{ status: 400 },
			);
		}

		const updateData: {
			approved?: boolean;
			featured?: boolean;
		} = {};
		if (typeof approved === "boolean")
			updateData.approved = approved;
		if (typeof featured === "boolean")
			updateData.featured = featured;

		await connectDB();

		const testimonial =
			await Testimonial.findByIdAndUpdate(
				id,
				updateData,
				{ new: true },
			).lean<TestimonialApiResponse>();

		if (!testimonial)
			return NextResponse.json(
				{ error: "Testimonial not found" },
				{ status: 404 },
			);

		return NextResponse.json(
			{
				success: true,
				message:
					"Testimonial updated successfully",
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

/**
 * DELETE – Remove testimonial
 */
export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id)
			return NextResponse.json(
				{ error: "Testimonial ID is required" },
				{ status: 400 },
			);

		await connectDB();

		const testimonial =
			await Testimonial.findByIdAndDelete(
				id,
			).lean<TestimonialApiResponse>();

		if (!testimonial)
			return NextResponse.json(
				{ error: "Testimonial not found" },
				{ status: 404 },
			);

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
