import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { Resend } from "resend";
import { TestimonialNotificationEmail } from "@/app/email/TestimonialNotification";

interface TestimonialFilter {
  approved?: boolean;
  featured?: boolean;
}

export const dynamic = "force-dynamic";

// --- PUBLIC METHODS ---

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";
    const featured = searchParams.get("featured") === "true";

    const filter: TestimonialFilter = showAll ? {} : { approved: true };
    if (featured) filter.featured = true;

    await connectDB();
    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .limit(featured ? 6 : 20)
      .lean();

    return NextResponse.json({ success: true, count: testimonials.length, data: testimonials }, { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Fetch failed";
    console.error("GET Error:", msg);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}


const resend = new Resend(
	process.env.RESEND_API_KEY,
);

// Only POST changes:

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

		if (!name || !message)
			return NextResponse.json(
				{ error: "Missing fields" },
				{ status: 400 },
			);

		await connectDB();
		const testimonial = await Testimonial.create({
			name,
			position,
			company,
			message,
			rating: rating ?? 5,
			image,
			approved: false,
			featured: false,
		});

		// Send email notification
		try {
			await resend.emails.send({
				from: "Tush-Cloud <onboarding@resend.dev>",
				to: ["oluwadipegodwin@gmail.com"],
				subject: `💬 New Testimonial from ${name} — Needs Approval`,
				react: TestimonialNotificationEmail({
					name,
					rating: rating ?? 5,
					message,
					position,
					company,
				}),
			});
		} catch (emailError) {
			console.error(
				"Email notification failed:",
				emailError,
			);
		}

		return NextResponse.json(
			{ success: true, data: testimonial },
			{ status: 201 },
		);
	} catch (error: unknown) {
		const msg =
			error instanceof Error
				? error.message
				: "Post failed";
		console.error("POST Error:", msg);
		return NextResponse.json(
			{ error: "Submission failed" },
			{ status: 500 },
		);
	}
}

// --- PROTECTED METHODS (Uses getServerSession & authOptions) ---

export async function PATCH(request: Request) {
  // Now using the imports to verify the user is logged in
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, ...updates } = await request.json();
    await connectDB();
    const updated = await Testimonial.findByIdAndUpdate(id, updates, { new: true }).lean();
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Update failed";
    console.error("PATCH Error:", msg);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await connectDB();
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted" }, { status: 200 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Delete failed";
    console.error("DELETE Error:", msg);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
