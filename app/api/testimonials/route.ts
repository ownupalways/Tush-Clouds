import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

interface TestimonialFilter {
    approved?: boolean;
    featured?: boolean;
}   
/**
 * GET – Retrieve testimonials
 */
export async function GET(request: Request) {
	try {
		await connectDB();

		const { searchParams } = new URL(request.url);
		const showAll =
			searchParams.get("all") === "true";
		const featured =
			searchParams.get("featured") === "true"; // ✅ NEW

		const filter: TestimonialFilter = showAll
			? {}
			: { approved: true };

		// 🔹 Homepage curation
		if (featured) {
			filter.featured = true;
		}

		const testimonials = await Testimonial.find(
			filter,
		)
			.sort({ createdAt: -1 })
			.limit(featured ? 6 : 20); // ✅ NEW

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
        const body = await request.json();
        const { name, position, company, message } = body;

        if (!name || !message) {
            return NextResponse.json(
                { error: "Name and message are required" },
                { status: 400 }
            );
        }

        await connectDB();

        const testimonial = await Testimonial.create({
            name,
            position,
            company,
            message,
            approved: false,
            featured: false,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Testimonial submitted successfully. Pending approval.",
                data: testimonial,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating testimonial:", error);
        return NextResponse.json(
            { error: "Failed to submit testimonial" },
            { status: 500 }
        );
    }
}

/**
 * PATCH – Update testimonial approval status
 */
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, approved, featured } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Testimonial ID is required" },
                { status: 400 }
            );
        }

        await connectDB();

        const updateData: { approved?: boolean; featured?: boolean } = {};
        if (typeof approved === "boolean") updateData.approved = approved;
        if (typeof featured === "boolean") updateData.featured = featured;

        const testimonial = await Testimonial.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!testimonial) {
            return NextResponse.json(
                { error: "Testimonial not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Testimonial updated successfully",
                data: testimonial,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating testimonial:", error);
        return NextResponse.json(
            { error: "Failed to update testimonial" },
            { status: 500 }
        );
    }
}

/**
 * DELETE – Remove a testimonial
 */
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Testimonial ID is required" },
                { status: 400 }
            );
        }

        await connectDB();

        const testimonial = await Testimonial.findByIdAndDelete(id);

        if (!testimonial) {
            return NextResponse.json(
                { error: "Testimonial not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Testimonial deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting testimonial:", error);
        return NextResponse.json(
            { error: "Failed to delete testimonial" },
            { status: 500 }
        );
    }
}
