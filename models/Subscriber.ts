import { Schema, model, models } from "mongoose";

// 1. Define the Interface
export interface ISubscriber {
  email: string;
  createdAt: Date;
}

// 2. Define the Schema
const SubscriberSchema = new Schema<ISubscriber>({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, 
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Export the Model
// Using 'models.Subscriber' handles Next.js Hot Module Replacement (HMR) 
// by preventing the "OverwriteModelError".
const Subscriber = models.Subscriber || model<ISubscriber>("Subscriber", SubscriberSchema);

export default Subscriber;
