"use server";

import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function checkoutAction(formData: FormData) {
  const items = JSON.parse(formData.get("items") as string);

  const lineItems = items.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: item.imageUrl ? [item.imageUrl] : [],
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  // Ensure we have a valid origin with protocol
  const origin = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/success`,
    cancel_url: `${origin}/checkout`,
  });

  if (session.url) {
    redirect(session.url);
  }
}