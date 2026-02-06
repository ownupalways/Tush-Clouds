export default function TestimonialSkeleton() {
	return (
		<div className="card animate-pulse bg-gray-100/50 dark:bg-gray-800/40">
			{/* Quote Icon */}
			<div className="w-10 h-10 rounded mb-4 bg-gray-200 dark:bg-gray-700 shimmer" />

			{/* Message */}
			<div className="space-y-3 mb-6">
				<div className="h-4 rounded w-full bg-gray-200 dark:bg-gray-700 shimmer" />
				<div className="h-4 rounded w-full bg-gray-200 dark:bg-gray-700 shimmer" />
				<div className="h-4 rounded w-3/4 bg-gray-200 dark:bg-gray-700 shimmer" />
			</div>

			{/* Stars */}
			<div className="flex gap-1 mb-6">
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700 shimmer"
					/>
				))}
			</div>

			{/* Author */}
			<div className="flex items-center gap-4 pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
				{/* Avatar */}
				<div className="w-14 h-14 rounded-full shrink-0 bg-gray-200 dark:bg-gray-700 shimmer" />

				{/* Name & Role */}
				<div className="flex-1 space-y-2">
					<div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 shimmer" />
					<div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700 shimmer" />
				</div>
			</div>
		</div>
	);
}
