"use client";

import {
	Suspense,
	useState,
	useEffect,
	useRef,
} from "react";
import {
	useSearchParams,
	useRouter,
} from "next/navigation";
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
import AddReviewButton from "@/components/AddReviewButton";
import TestimonialSkeleton from "@/components/TestimonialSkeleton";

interface Testimonial {
	_id: string;
	name: string;
	position?: string;
	company?: string;
	message: string;
	rating: number;
	image?: string;
	createdAt: string;
}

async function loadTestimonials(): Promise<
	Testimonial[]
> {
	const res = await fetch("/api/testimonials");
	if (!res.ok)
		throw new Error(`API Error: ${res.status}`);
	const contentType = res.headers.get(
		"content-type",
	);
	if (
		!contentType?.includes("application/json")
	) {
		throw new Error("Response is not JSON");
	}
	const data = await res.json();
	return data.data || [];
}

function TestimonialsPageContent() {
	const [testimonials, setTestimonials] =
		useState<Testimonial[]>([]);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();
	const router = useRouter();
	const buttonRef =
		useRef<HTMLButtonElement>(null);

	useEffect(() => {
		loadTestimonials()
			.then((data) => setTestimonials(data))
			.catch(console.error)
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		if (searchParams.get("action") === "add") {
			setTimeout(
				() => buttonRef.current?.click(),
				600,
			);
		}
	}, [searchParams]);

	const handleReviewSuccess = () => {
		setLoading(true);
		loadTestimonials()
			.then((data) => setTestimonials(data))
			.catch(console.error)
			.finally(() => setLoading(false));
		setTimeout(() => router.push("/"), 1500);
	};

	return (
		<div className="min-h-screen py-16 md:py-24">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="mb-4">
						What Our Clients Say
					</h1>
					<p className="mx-auto max-w-2xl mb-5">
						Testimonials from satisfied clients
						and partners
					</p>
				</div>

				{loading ? (
					<div className="grid gap-6 md:grid-cols-2">
						<TestimonialSkeleton />
						<TestimonialSkeleton />
						<TestimonialSkeleton />
						<TestimonialSkeleton />
					</div>
				) : testimonials.length === 0 ? (
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
							ref={buttonRef}
							type="testimonial"
							onSuccess={handleReviewSuccess}
						/>
					</div>
				) : (
					<div>
						<div className="flex justify-center mb-8">
							<AddReviewButton
								ref={buttonRef}
								type="testimonial"
								onSuccess={handleReviewSuccess}
							/>
						</div>
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
							style={{ alignItems: "stretch" }}
							className="pb-12 testimonial-swiper">
							{testimonials.map((testimonial) => (
								<SwiperSlide
									key={testimonial._id}
									className="!h-auto !flex !flex-col">
									<div className="card group cursor-pointer flex flex-col flex-1 h-full">
										<div className="grow">
											<FontAwesomeIcon
												icon={faQuoteLeft}
												className="text-3xl text-brand-green/20 dark:text-brand-lemon/20 mb-4"
											/>
											<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
												{testimonial.message}
											</p>
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
		</div>
	);
}

export default function TestimonialsPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen py-16 md:py-24">
					<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
						<div className="grid gap-6 md:grid-cols-2">
							<TestimonialSkeleton />
							<TestimonialSkeleton />
							<TestimonialSkeleton />
							<TestimonialSkeleton />
						</div>
					</div>
				</div>
			}>
			<TestimonialsPageContent />
		</Suspense>
	);
}
