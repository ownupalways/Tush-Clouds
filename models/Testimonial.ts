import mongoose, {
	Schema,
	models,
	Model,
} from "mongoose";

export interface ITestimonial {
	name: string;
	position?: string;
	company?: string;
	message: string;
	rating?: number;
	image?: string;
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
