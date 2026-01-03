"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const { items } = useCartStore();

  const total = items.reduce(
    (a, i) => a + i.price * i.quantity,
    0
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-12 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={72}
                  height={72}
                  className="rounded-xl border"
                />
              )}
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-neutral-500">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between border-t pt-4 font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 space-y-6">
          <h2 className="text-lg font-semibold">Payment</h2>

          <input className="w-full rounded-lg border px-4 py-3 text-sm" placeholder="Card number" />
          <div className="grid grid-cols-2 gap-4">
            <input className="rounded-lg border px-4 py-3 text-sm" placeholder="MM / YY" />
            <input className="rounded-lg border px-4 py-3 text-sm" placeholder="CVC" />
          </div>

          <button className="w-full rounded-full bg-black py-3 text-white hover:bg-neutral-800">
            Pay ${total.toFixed(2)}
          </button>

          <p className="text-xs text-neutral-500 text-center">
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
