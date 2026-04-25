"use client";

import {
	useState,
	useEffect,
	useRef,
} from "react";
import {
	useSearchParams,
	useRouter,
} from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import AddReviewButton from "@/components/AddReviewButton";
import TestimonialSkeleton from "@/components/TestimonialSkeleton";

interface Review {
	_id: string;
	name: string;
	rating: number;
	comment: string;
	category?: string;
	createdAt: string;
}

async function loadReviews(): Promise<{
	data: Review[];
	averageRating: number;
}> {
	const res = await fetch("/api/reviews");
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
	return {
		data: data.data || [],
		averageRating: data.averageRating || 0,
	};
}

export default function ReviewsPage() {
	const [reviews, setReviews] = useState<
		Review[]
	>([]);
	const [averageRating, setAverageRating] =
		useState(0);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();
	const router = useRouter();
	const buttonRef =
		useRef<HTMLButtonElement>(null);

	const fetchReviews = () => {
		setLoading(true);
		loadReviews()
			.then(({ data, averageRating }) => {
				setReviews(data);
				setAverageRating(averageRating);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		loadReviews()
			.then(({ data, averageRating }) => {
				setReviews(data);
				setAverageRating(averageRating);
			})
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
		fetchReviews();
		setTimeout(() => router.push("/"), 1500);
	};

	
	const renderStars = (
		rating: number,
		filled: boolean = true,
	) => {
		return [...Array(5)].map((_, i) => (
			<FontAwesomeIcon
				key={i}
				icon={faStar}
				className={`${
					i < rating
						? filled
							? "text-brand-lemon-400"
							: "text-gray-300 dark:text-gray-600"
						: "text-gray-300 dark:text-gray-600"
				} mr-1 transition-colors duration-200`}
			/>
		));
	};

	return (
		<div className="min-h-screen py-16 md:py-24 bg-bg-primary transition-colors duration-300">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="mb-4">
						Customer Reviews
					</h1>
					<p className="text-xl md:text-2xl text-text-secondary mb-8">
						See what our customers think about our
						work
					</p>

					{!loading && reviews.length > 0 && (
						<div className="inline-block card p-8 md:p-10 hover:scale-105 transition-transform duration-300 mb-5">
							<div className="text-6xl font-bold text-linear mb-3">
								{averageRating.toFixed(1)}
							</div>
							<div className="mb-3 flex justify-center">
								{renderStars(
									Math.round(averageRating),
								)}
							</div>
							<p className="text-text-secondary mb-6">
								Based on {reviews.length}{" "}
								{reviews.length === 1
									? "review"
									: "reviews"}
							</p>
							<AddReviewButton
								ref={buttonRef}
								type="review"
								onSuccess={handleReviewSuccess}
								buttonText="Add Your Review"
							/>
						</div>
					)}
				</div>

				{/* Reviews List */}
				{loading ? (
					<div className="grid gap-6 md:grid-cols-2">
						<TestimonialSkeleton />
						<TestimonialSkeleton />
						<TestimonialSkeleton />
						<TestimonialSkeleton />
					</div>
				) : reviews.length === 0 ? (
					<div className="text-center py-20">
						<div className="card max-w-md mx-auto p-10">
							<div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-brand-lemon-200 to-brand-green-200 dark:from-brand-lemon-900 dark:to-brand-green-900 flex items-center justify-center">
								<FontAwesomeIcon
									icon={faStar}
									className="text-3xl text-brand-lemon-600 dark:text-brand-lemon-400"
								/>
							</div>
							<h3 className="text-2xl font-semibold mb-4 text-text-primary">
								No reviews yet
							</h3>
							<p className="text-lg text-text-secondary mb-6">
								Be the first to share your
								experience!
							</p>
							<AddReviewButton
								ref={buttonRef}
								type="review"
								onSuccess={handleReviewSuccess}
								buttonText="Write First Review"
							/>
						</div>
					</div>
				) : (
					<div className="space-y-6">
						{reviews.map((review, index) => (
							<div
								key={review._id}
								className="card border-l-4 border-l-brand-lemon hover:border-l-brand-green transition-all duration-300 hover:-translate-y-1"
								style={{
									animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
								}}>
								<div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
									<div className="flex-1">
										<h3 className="text-xl font-semibold text-text-primary mb-2">
											{review.name}
										</h3>
										<div className="flex items-center">
											{renderStars(review.rating)}
										</div>
									</div>

									{review.category && (
										<span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-linear-to-r from-brand-lemon-100 to-brand-green-100 dark:from-brand-lemon-900/30 dark:to-brand-green-900/30 text-brand-green-700 dark:text-brand-green-300 capitalize border border-brand-green-200 dark:border-brand-green-800">
											{review.category}
										</span>
									)}
								</div>

								<p className="text-text-secondary leading-relaxed text-base md:text-lg mb-4 italic">
									&ldquo;{review.comment}&rdquo;
								</p>

								<div className="flex items-center justify-between pt-4 border-t border-border-color">
									<time className="text-sm text-text-tertiary">
										{new Date(
											review.createdAt,
										).toLocaleDateString(
											"en-US",
											{
												year: "numeric",
												month: "long",
												day: "numeric",
											},
										)}
									</time>
									<div className="flex gap-1">
										{renderStars(
											review.rating,
											false,
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<style jsx>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
