export default function TestimonialSkeleton() {
  return (
    <div className="card animate-pulse">
      {/* Quote Icon Skeleton */}
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      
      {/* Message Skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </div>
      
      {/* Stars Skeleton */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        ))}
      </div>
      
      {/* Author Info Skeleton */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        {/* Avatar */}
        <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
        
        {/* Name & Position */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    </div>
  );
}
