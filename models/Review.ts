import mongoose, {
	Schema,
	models,
	Model,
} from "mongoose";

/**
 * Reviews = transactional / service-based feedback
 * Can grow large and be filtered/paginated
 */
export interface IReview {
	name: string;
	email?: string;
	rating: number;
	comment: string;
	category?: string;

	// ✅ NEW (optional, non-breaking)
	// Allows reviews to be tied to a specific item later
	targetType?: "service" | "course" | "portfolio";
	targetId?: string;

	approved: boolean;
	createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
		rating: {
			type: Number,
			required: [true, "Rating is required"],
			min: 1,
			max: 5,
		},
		comment: {
			type: String,
			required: [true, "Comment is required"],
			trim: true,
		},
		category: {
			type: String,
			enum: [
				"website",
				"service",
				"portfolio",
				"other",
			],
			default: "other",
		},

		// 🔹 NEW FIELDS (optional – existing data unaffected)
		targetType: {
			type: String,
			enum: ["service", "course", "portfolio"],
		},
		targetId: {
			type: String,
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

const Review: Model<IReview> =
	models.Review ||
	mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
