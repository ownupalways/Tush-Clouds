"use server";

import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

const EmailSchema = z
	.string()
	.email("Invalid email address");

// prevState is required by the useActionState hook signature
export async function subscribeToNewsletter(
	prevState: unknown,
	formData: FormData,
) {
	const email = formData.get("email");

	const validated = EmailSchema.safeParse(email);
	if (!validated.success) {
		return {
			error:
				validated.error.flatten().formErrors[0] ||
				"Invalid email",
			success: false,
		};
	}

	try {
		await connectDB();

		await Subscriber.create({
			email: validated.data,
		});

		return { success: true, error: undefined };
	} catch (err: unknown) {
		// ✅ Type Guard: Check if 'err' is an object with a 'code' property
		if (
			err &&
			typeof err === "object" &&
			"code" in err &&
			err.code === 11000
		) {
			return {
				error: "You are already subscribed!",
				success: false,
			};
		}

		console.error("Newsletter Error:", err);
		return {
			error:
				"Service unavailable. Try again later.",
			success: false,
		};
	}
}
