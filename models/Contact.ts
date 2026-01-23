import mongoose, { Schema, models, Model } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  status: "new" | "read" | "replied";
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Contact: Model<IContact> =
  models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
