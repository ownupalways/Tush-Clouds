import mongoose from 'mongoose';


const MONGODB_URI = "mongodb+srv://Godwin_J_Oluwadipe:GoodGodFirst_10%24@cluster0.szhqcm8.mongodb.net/testimonials?retryWrites=true&w=majority";

const TestimonialSchema = new mongoose.Schema({
  name: String,
  position: String,
  company: String,
  message: String,
  rating: Number,
  approved: Boolean,
  featured: Boolean,
}, { timestamps: true });

const ReviewSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  comment: String,
  category: String,
  approved: Boolean,
}, { timestamps: true });

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
const Review = mongoose.model('Review', ReviewSchema);

async function seedData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Add testimonials
    await Testimonial.insertMany([
      {
        name: "John Doe",
        position: "CEO",
        company: "Tech Corp",
        message: "Excellent service! Highly recommended.",
        rating: 5,
        approved: true,
        featured: true,
      },
      {
        name: "Jane Smith",
        position: "Designer",
        company: "Creative Agency",
        message: "Amazing work quality and professionalism.",
        rating: 5,
        approved: true,
        featured: true,
      }
    ]);

    // Add reviews
    await Review.insertMany([
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        rating: 5,
        comment: "Great experience working together!",
        category: "service",
        approved: true,
      },
      {
        name: "Sarah Williams",
        email: "sarah@example.com",
        rating: 4,
        comment: "Very professional and timely delivery.",
        category: "portfolio",
        approved: true,
      }
    ]);

    console.log('✅ Test data added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedData();
