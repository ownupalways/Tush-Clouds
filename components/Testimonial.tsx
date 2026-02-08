"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faQuoteLeft,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
	Swiper,
	SwiperSlide,
} from "swiper/react";
import {
	Pagination,
	Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AddReviewButton from "./AddReviewButton";
import Link from "next/link";
import TestimonialSkeleton from "./TestimonialSkeleton";
import { getAvatarUrl } from "@/utils/avatar"; // dynamic avatar URL helper

interface TestimonialApiResponse {
	_id: string;
	image?: string;
	name: string;
	position?: string;
	company?: string;
	message: string;
	rating?: number;
}

// Static testimonials fallback
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
		// Add more static testimonials as needed
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
			const res = await fetch(
				"/api/testimonials",
			);
			const data = await res.json();

			if (
				data.success &&
				Array.isArray(data.data) &&
				data.data.length > 0
			) {
				const dbTestimonials = data.data.map(
					(t: TestimonialApiResponse) => ({
						_id: t._id,
						image:
							t.image || getAvatarUrl(t.name),
						name: t.name,
						position: t.position,
						company: t.company,
						message: t.message,
						rating: t.rating ?? 5,
					}),
				);

				setTestimonials([
					...staticTestimonials,
					...dbTestimonials,
				]);
			} else {
				// fallback: only static testimonials
				setTestimonials(staticTestimonials);
			}
		} catch (error) {
			console.error(
				"Error fetching testimonials:",
				error,
			);
			setTestimonials(staticTestimonials); // fallback
		} finally {
			setLoading(false);
		}
	};

	const handleReviewSuccess = () => {
		fetchTestimonials(); // Refresh after a new review
	};

	return (
		<section
			id="testimonial"
			className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Testimonials
					</h2>
					<p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Hear from clients and partners who
						have experienced our commitment to
						excellence.
					</p>

					{/* Action Buttons */}
					<div className="flex flex-wrap justify-center gap-4 mt-6">
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
					<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						<TestimonialSkeleton />
						<TestimonialSkeleton />
						<TestimonialSkeleton />
						<TestimonialSkeleton />
					</div>
				) : testimonials.length === 0 ? (
					<div className="text-center py-12">
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
					<Swiper
						modules={[Pagination, Autoplay]}
						spaceBetween={30}
						slidesPerView={1}
						pagination={{ clickable: true }}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						breakpoints={{
							640: { slidesPerView: 1 },
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
						}}
						className="pb-12">
						{testimonials.map((t) => (
							<SwiperSlide key={t._id}>
								<div className="card group cursor-pointer flex flex-col justify-between h-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
									<div>
										{/* Quote Icon */}
										<FontAwesomeIcon
											icon={faQuoteLeft}
											className="text-3xl text-brand-green/20 dark:text-brand-lemon/20 mb-4"
										/>

										{/* Message */}
										<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm sm:text-base md:text-lg">
											{t.message}
										</p>

										{/* Star Rating */}
										<div className="flex gap-1 mb-6">
											{[...Array(5)].map(
												(_, i) => (
													<FontAwesomeIcon
														key={i}
														icon={faStar}
														className={`text-sm ${
															i < (t.rating ?? 5)
																? "text-brand-lemon"
																: "text-gray-300 dark:text-gray-600"
														}`}
													/>
												),
											)}
										</div>
									</div>

									{/* Author Info */}
									<div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
										<div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
											<Image
												src={
													t.image ||
													getAvatarUrl(t.name)
												}
												alt={t.name}
												fill
												sizes="56px"
												className="object-cover"
											/>
										</div>
										<div>
											<h5 className="font-bold text-gray-900 dark:text-gray-100">
												{t.name}
											</h5>
											{(t.position ||
												t.company) && (
												<p className="text-sm text-gray-600 dark:text-gray-400">
													{t.position}
													{t.position &&
														t.company &&
														" at "}
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
