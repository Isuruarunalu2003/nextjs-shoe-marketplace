import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.default_price?.unit_amount
    ? `$${(product.default_price.unit_amount / 100).toFixed(2)}`
    : "—";

  const image = product.images?.[0];

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition hover:border-white/20"
    >
      {/* Image */}
      <div className="relative aspect-square bg-neutral-800 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-500">
            No image
          </div>
        )}

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 font-medium text-white">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm text-neutral-400">
          {product.description || "Premium quality product"}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm font-semibold text-white">
            {price}
          </span>

          <span className="text-xs text-neutral-500 transition group-hover:text-white">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
