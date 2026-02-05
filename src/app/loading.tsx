// src/app/loading.tsx
export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <div className="animate-pulse">
        {/* Title Skeleton */}
        <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-8"></div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border rounded-lg shadow-md overflow-hidden">
              {/* Image Skeleton */}
              <div className="w-full h-48 bg-gray-200"></div>
              
              {/* Content Skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
