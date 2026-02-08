// components/ProjectCardSkeleton.tsx
export default function ProjectCardSkeleton() {
	return (
		<div className="card animate-pulse cursor-pointer group relative overflow-hidden min-w-[280px] sm:min-w-[320px] md:min-w-[350px] h-full flex flex-col">
			{/* Image Placeholder */}
			<div className="relative h-48 mb-4 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden shimmer" />

			{/* Content Placeholder */}
			<div className="flex-1 flex flex-col">
				{/* Title Placeholder */}
				<div className="mb-2">
					<div className="h-5 sm:h-6 rounded bg-gray-200 dark:bg-gray-700 w-3/4 shimmer" />
				</div>

				{/* Description Placeholder */}
				<div className="mb-4 space-y-2 flex-1">
					<div className="h-3 rounded bg-gray-200 dark:bg-gray-700 w-full shimmer" />
					<div className="h-3 rounded bg-gray-200 dark:bg-gray-700 w-full shimmer" />
					<div className="h-3 rounded bg-gray-200 dark:bg-gray-700 w-5/6 shimmer" />
				</div>

				{/* Tags Placeholder */}
				<div className="flex flex-wrap gap-2 mb-4">
					<div className="h-5 w-16 rounded bg-gray-200 dark:bg-gray-700 shimmer" />
					<div className="h-5 w-14 rounded bg-gray-200 dark:bg-gray-700 shimmer" />
					<div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700 shimmer" />
				</div>

				{/* View Details Placeholder */}
				<div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700 shimmer" />
			</div>
		</div>
	);
}
