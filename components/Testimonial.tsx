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
import { getAvatarUrl } from "@/utils/avatar";

interface TestimonialApiResponse {
  _id: string;
  image?: string;
  name: string;
  position?: string;
  company?: string;
  message: string;
  rating?: number;
}

const staticTestimonials: TestimonialApiResponse[] = [
  {
    _id: "static-1",
    image: "/Images/Tomiwa.jpg",
    name: "Tomiwa Oluwadipe",
    position: "CEO",
    company: "Tech Startup",
    message: "Working with Godwin was an absolute pleasure. His attention to detail and commitment to excellence made our project a success.",
    rating: 5,
  },
];

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState<TestimonialApiResponse[]>(staticTestimonials);
  const [loading, setLoading] = useState(true);

  // 1. Unified fetch logic
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/testimonials?featured=true");
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        const dbTestimonials = data.data.map((t: TestimonialApiResponse) => ({
          ...t,
          image: t.image || getAvatarUrl(t.name),
          rating: t.rating ?? 5,
        }));

        // Merge static and DB results
        setTestimonials([...staticTestimonials, ...dbTestimonials]);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleReviewSuccess = () => fetchTestimonials();

  return (
		<section
			id="testimonial"
			className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900/50">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Header Section */}
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
						Client{" "}
						<span className="text-brand-green dark:text-brand-lemon">
							Feedback
						</span>
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
						Hear from partners who have
						experienced our commitment to
						excellence first-hand.
					</p>

					<div className="flex flex-wrap justify-center gap-4">
						<AddReviewButton
							type="testimonial"
							onSuccess={handleReviewSuccess}
						/>
						<Link
							href="/testimonials"
							className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-green/20 dark:border-brand-lemon/20 text-brand-green dark:text-brand-lemon font-semibold rounded-xl hover:bg-brand-green dark:hover:bg-brand-lemon hover:text-white dark:hover:text-brand-green transition-all duration-300">
							View All Reviews
						</Link>
					</div>
				</div>

				{/* Dynamic Content Area */}
				{loading ? (
					<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 3 }).map(
							(_, i) => (
								<TestimonialSkeleton key={i} />
							),
						)}
					</div>
				) : testimonials.length === 0 ? (
					<div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
						<div className="text-5xl mb-4">
							✨
						</div>
						<h3 className="text-xl font-bold mb-2 dark:text-white">
							No testimonials yet
						</h3>
						<p className="text-gray-500 dark:text-gray-400 mb-6">
							Be the first to share your
							experience!
						</p>
						<AddReviewButton
							type="testimonial"
							onSuccess={handleReviewSuccess}
						/>
					</div>
				) : (
					<Swiper
						modules={[Pagination, Autoplay]}
						spaceBetween={24}
						slidesPerView={1}
						pagination={{
							clickable: true,
							dynamicBullets: true,
						}}
						autoplay={{
							delay: 6000,
							disableOnInteraction: false,
						}}
						breakpoints={{
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
						}}
						className="pb-16 testimonial-swiper">
						{testimonials.map((t) => (
							<SwiperSlide
								key={t._id}
								className="h-auto flex flex-col">
								<div className="flex flex-col flex-1 h-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-brand-green dark:hover:border-brand-lemon transition-colors duration-300">
									<div className="grow">
										<FontAwesomeIcon
											icon={faQuoteLeft}
											className="text-3xl text-brand-green/10 dark:text-brand-lemon/10 mb-4"
										/>
										<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
											&quot;{t.message}&quot;
										</p>
										<div className="flex gap-1 mb-8">
											{[...Array(5)].map(
												(_, i) => (
													<FontAwesomeIcon
														key={i}
														icon={faStar}
														className={`text-sm ${
															i < (t.rating ?? 5)
																? "text-brand-lemon"
																: "text-gray-200 dark:text-gray-700"
														}`}
													/>
												),
											)}
										</div>
									</div>

									<div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
										<div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-green/20 dark:ring-brand-lemon/20 shrink-0">
											<Image
												src={
													t.image ||
													getAvatarUrl(t.name)
												}
												alt={t.name}
												fill
												className="object-cover"
												sizes="48px"
											/>
										</div>
										<div className="overflow-hidden">
											<h5 className="font-bold text-gray-900 dark:text-white truncate">
												{t.name}
											</h5>
											{(t.position ||
												t.company) && (
												<p className="text-xs text-gray-500 dark:text-gray-400 truncate">
													{t.position}{" "}
													{t.position &&
														t.company &&
														"@"}{" "}
													{t.company}
												</p>
											)}
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
