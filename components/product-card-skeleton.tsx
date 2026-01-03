export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
      <div className="aspect-square bg-neutral-800" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-neutral-700" />
        <div className="h-3 w-full rounded bg-neutral-800" />
        <div className="h-3 w-2/3 rounded bg-neutral-800" />
      </div>
    </div>
  );
}
