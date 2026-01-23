import mongoose, {
	Schema,
	models,
	Model,
} from "mongoose";

export interface IReview {
	name: string;
	email?: string;
	rating: number;
	comment: string;
	category?: string;
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
