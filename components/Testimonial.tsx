"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ReviewForm from "./ReviewForm";

interface Testimonial {
  _id: string;
  avatar?: string;
  name: string;
  position?: string;
  company?: string;
  message: string;
  rating?: number;
}

// Static testimonials as fallback
const staticTestimonials: Testimonial[] = [
  {
    _id: "static-1",
    avatar: "/images/Tomiwa.jpg",
    name: "Tomiwa Oluwadipe",
    position: "CEO",
    company: "Tech Startup",
    message: "Working with Godwin was an absolute pleasure...",
    rating: 5,
  },
  // Add your other static testimonials here
];

export default function Testimonial() {
  const [showForm, setShowForm] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      
      if (data.success && data.data.length > 0) {
        // Combine static testimonials with database testimonials
        const dbTestimonials = data.data.map((t: {
          _id: string;
          image?: string;
          name: string;
          position?: string;
          company?: string;
          message: string;
          rating?: number;
        }) => ({
          _id: t._id,
          avatar: t.image || "/images/default-avatar.jpg",
          name: t.name,
          position: t.position,
          company: t.company,
          message: t.message,
          rating: t.rating || 5,
        }));
        
        // Mix static and database testimonials
        setTestimonials([...staticTestimonials, ...dbTestimonials]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Keep static testimonials on error
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSuccess = () => {
    fetchTestimonials(); // Refresh testimonials after submission
  };

  return (
    <section id="testimonial" className="py-16 md:py-24 bg-linear-to-b from-white to-gray-50 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-green mb-6">
            Testimonials
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-lemon text-brand-green font-semibold rounded-lg hover:scale-105 transition-all shadow-md cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} className="text-sm" />
            Add Your Review
          </button>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
              <ReviewForm 
                onClose={() => setShowForm(false)} 
                onSuccess={handleReviewSuccess}
              />
            </div>
          </div>
        )}

        {/* Testimonials Slider */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{ 1024: { slidesPerView: 2 } }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    className="text-3xl text-brand-green/20 mb-4"
                  />
                  <p className="text-gray-700 text-sm mb-6">{testimonial.message}</p>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-brand-lemon text-sm"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t">
                    {testimonial.avatar && (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                      <p className="text-sm text-gray-600">
                        {testimonial.position}
                        {testimonial.position && testimonial.company && " at "}
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
