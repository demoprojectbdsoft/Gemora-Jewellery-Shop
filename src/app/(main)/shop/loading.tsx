import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";

export default function ShopLoading() {
  return (
    <div className="w-full py-6 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded-md" />
        <div className="h-3 w-3 bg-gray-200 dark:bg-gray-800 rounded-md" />
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
      </div>

      {/* Top Bar Skeleton */}
      <div className="h-16 w-full bg-white dark:bg-gray-900 rounded-2xl border border-sky-100/80 dark:border-gray-800 mb-6" />

      {/* Main layout: Sidebar skeleton + Products grid skeleton */}
      <div className="flex flex-col lg:flex-row items-start gap-6 xl:gap-8">
        {/* Full-Length Desktop Sidebar Skeleton */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-sky-100/80 dark:border-gray-800 p-5 space-y-5 shadow-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-sky-100/80 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md bg-sky-200/70 dark:bg-sky-950/70" />
                <div className="h-3.5 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
              </div>
              <div className="h-3 w-10 bg-red-100 dark:bg-red-950/40 rounded-md" />
            </div>

            {/* Categories Section */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-sky-200/70 dark:bg-sky-950/70" />
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded-md" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-sky-100/60 dark:border-gray-800/80 p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-sky-200/60 dark:bg-sky-900/60" />
                      <div className={`h-3 ${i % 2 === 0 ? "w-28" : "w-20"} bg-gray-200 dark:bg-gray-800 rounded-md`} />
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-200 dark:bg-gray-800" />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Section */}
            <div className="space-y-3 pt-2 border-t border-sky-100/80 dark:border-gray-800">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-sky-200/70 dark:bg-sky-950/70" />
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded-md" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-10 bg-sky-200/60 dark:bg-sky-950/60 rounded-md" />
                <div className="h-3 w-10 bg-sky-200/60 dark:bg-sky-950/60 rounded-md" />
              </div>
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full" />
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-800 rounded-lg" />
            </div>

            {/* Discount Section */}
            <div className="space-y-2.5 pt-2 border-t border-sky-100/80 dark:border-gray-800">
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 rounded-sm bg-sky-200/70 dark:bg-sky-950/70" />
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 w-14 rounded-full bg-gray-200 dark:bg-gray-800" />
                ))}
              </div>
            </div>

            {/* Featured Section */}
            <div className="space-y-3 pt-2 border-t border-sky-100/80 dark:border-gray-800">
              <div className="p-3 rounded-xl border border-sky-100/80 dark:border-gray-800 space-y-2">
                <div className="h-3 w-16 bg-amber-200/60 dark:bg-amber-950/60 rounded-md" />
                <div className="flex gap-4">
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded-full" />
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid Skeleton */}
        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200/80 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-xs">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 h-full">
              <ProductCardSkeleton hasRightBorder={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
