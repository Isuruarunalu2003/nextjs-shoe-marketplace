"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-card-skeleton";
import type Stripe from "stripe";

interface CarouselProps {
  products?: Stripe.Product[];
  loading?: boolean;
}

export function Carousel({ products = [], loading }: CarouselProps) {
  return (
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="w-[260px] shrink-0 sm:w-[300px]"
              >
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((product, index) => (
              <motion.div
                key={product.id}
                className="w-[260px] shrink-0 sm:w-[300px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
      </div>
    </div>
  );
}
