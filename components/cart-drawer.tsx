"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { Button } from "./ui/button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem } = useCartStore();

  const total = items.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Your Cart</h2>
                <button onClick={closeCart}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
                {items.length === 0 && (
                  <p className="text-sm text-neutral-500">
                    Your cart is empty.
                  </p>
                )}

                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-lg border"
                      />
                    )}

                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-neutral-500">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-neutral-400 hover:text-black"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t px-6 py-4 space-y-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button asChild className="w-full rounded-full">
                  <Link href="/checkout" onClick={closeCart}>
                    Go to Checkout
                  </Link>
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
