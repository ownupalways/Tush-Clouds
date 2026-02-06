"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AddReviewButton from "./AddReviewButton";
import Link from "next/link";
import TestimonialSkeleton from "./TestimonialSkeleton";

interface TestimonialApiResponse {
  _id: string;
  image: string;
  name: string;
  position?: string;
  company?: string;
  message: string;
  rating: number;
}

// Static testimonials as fallback
const staticTestimonials: TestimonialApiResponse[] =
	[
		{
			_id: "static-1",
			image: "/Images/Tomiwa.jpg",
			name: "Tomiwa Oluwadipe",
			position: "CEO",
			company: "Tech Startup",
			message:
				"Working with Godwin was an absolute pleasure. His attention to detail and commitment to excellence made our project a success.",
			rating: 5,
		},
		// Add your other static testimonials here
	];

export default function Testimonial() {
  const [testimonials, setTestimonials] =
		useState<TestimonialApiResponse[]>(
			staticTestimonials,
		);
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
        const dbTestimonials = data.data.map(
					(t: TestimonialApiResponse) => ({
						_id: t._id,
						image:
							t.image ||
							`https://ui-avatars.com/api/?name=${encodeURIComponent(
								t.name,
							)}&background=FACC15&color=14532D`,
						name: t.name,
						position: t.position,
						company: t.company,
						message: t.message,
						rating: t.rating || 5,
					}),
				);
        
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
		<section
			id="testimonial"
			className="pb-16 md:py-24 relative">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12 md:mb-16">
					<h2 className="mb-6">Testimonials</h2>
					<p className="mx-auto max-w-2xl mb-8">
						Hear from clients and partners who
						have experienced our commitment to
						excellence.
					</p>

					{/* Action Buttons */}
					<div className="flex flex-wrap justify-center gap-4">
						<AddReviewButton
							type="testimonial"
							onSuccess={handleReviewSuccess}
						/>
						<Link
							href="/testimonials"
							className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-green dark:border-brand-lemon text-brand-green dark:text-brand-lemon font-semibold rounded-xl hover:bg-brand-green dark:hover:bg-brand-lemon hover:text-white dark:hover:text-brand-green transition-all duration-300 active:scale-95">
							View All Testimonials
						</Link>
					</div>
				</div>

				{/* Testimonials Slider */}
				{loading ? (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
						<TestimonialSkeleton />
						<TestimonialSkeleton />
						<TestimonialSkeleton />
						<TestimonialSkeleton />
					</div>
				) : testimonials.length === 0 ? (
					// Empty State
					<div className="text-center py-5">
						<div className="text-6xl mb-4">
							💬
						</div>
						<h3 className="text-2xl font-bold mb-2">
							No testimonials yet
						</h3>
						<p className="text-gray-600 dark:text-gray-400 mb-6">
							Be the first to share your
							experience!
						</p>
						<AddReviewButton
							type="testimonial"
							onSuccess={handleReviewSuccess}
						/>
					</div>
				) : (
					// Testimonials Slider with Add Review Button
					<div>
						<Swiper
							modules={[Pagination, Autoplay]}
							spaceBetween={30}
							slidesPerView={1}
							pagination={{
								clickable: true,
								bulletClass:
									"swiper-pagination-bullet",
								bulletActiveClass:
									"swiper-pagination-bullet-active",
							}}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							breakpoints={{
								1024: { slidesPerView: 2 },
							}}
							className="pb-12">
							{testimonials.map((testimonial) => (
								<SwiperSlide
									key={testimonial._id}>
									<div className="card group cursor-pointer h-85 flex flex-col justify-between">
										<div>
											{/* Quote Icon */}
											<FontAwesomeIcon
												icon={faQuoteLeft}
												className="text-3xl text-brand-green/20 dark:text-brand-lemon/20 mb-4"
											/>

											{/* Message */}
											<div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-xl">
												{testimonial.message}
											</div>

											{/* Star Rating */}
											<div className="flex gap-1 mb-6">
												{[...Array(5)].map(
													(_, i) => (
														<FontAwesomeIcon
															key={i}
															icon={faStar}
															className={`text-sm ${
																i <
																(testimonial.rating ||
																	5)
																	? "text-brand-lemon"
																	: "text-gray-300 dark:text-gray-600"
															}`}
														/>
													),
												)}
											</div>
										</div>

										{/* Author Info */}
										<div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
											<div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
												<Image
													src={
														testimonial.image ||
														`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=FACC15&color=14532D`
													}
													alt={testimonial.name}
													fill
													sizes="56px"
													className="object-cover"
												/>
											</div>
											<div>
												<h5 className="font-bold text-gray-900 dark:text-gray-100">
													{testimonial.name}
												</h5>
												{(testimonial.position ||
													testimonial.company) && (
													<p className="text-sm text-gray-600 dark:text-gray-400">
														{testimonial.position}
														{testimonial.position &&
															testimonial.company &&
															" at "}
														{testimonial.company}
													</p>
												)}
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				)}
			</div>
		</section>
	);
}
