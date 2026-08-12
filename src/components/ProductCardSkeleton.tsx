export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex h-64 items-center justify-center bg-zinc-50">
        <div className="h-44 w-44 animate-pulse rounded-xl bg-zinc-200" />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 animate-pulse rounded bg-zinc-200" />
          <div className="h-5 w-5 animate-pulse rounded-full bg-zinc-200" />
        </div>

        <div className="space-y-2">
          <div className="h-5 w-4/5 animate-pulse rounded bg-zinc-200" />
          <div className="h-4 w-2/5 animate-pulse rounded bg-zinc-100" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="h-7 w-24 animate-pulse rounded bg-zinc-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-zinc-100" />
        </div>
      </div>
    </div>
  );
}