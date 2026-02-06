import mongoose, {
	Schema,
	models,
	Model,
} from "mongoose";

/**
 * Testimonials = curated, marketing-focused feedback
 * Used on homepage, landing pages
 */
export interface ITestimonial {
	name: string;
	position?: string;
	company?: string;
	message: string;
	rating?: number;
	image?: string;

	// ✅ NEW (optional)
	// Controls homepage visibility
	featured?: boolean;

	approved: boolean;
	createdAt: Date;
}

const TestimonialSchema =
	new Schema<ITestimonial>(
		{
			name: {
				type: String,
				required: [true, "Name is required"],
				trim: true,
			},
			position: {
				type: String,
				trim: true,
			},
			company: {
				type: String,
				trim: true,
			},
			message: {
				type: String,
				required: [true, "Message is required"],
				trim: true,
			},
			rating: {
				type: Number,
				min: 1,
				max: 5,
				default: 5,
			},
			image: {
				type: String,
				trim: true,
			},

			// 🔹 NEW FIELD
			featured: {
				type: Boolean,
				default: false,
			},

			approved: {
				type: Boolean,
				default: false,
			},
		},
		{
			timestamps: true,
		},
	);

const Testimonial: Model<ITestimonial> =
	models.Testimonial ||
	mongoose.model<ITestimonial>(
		"Testimonial",
		TestimonialSchema,
	);

export default Testimonial;
