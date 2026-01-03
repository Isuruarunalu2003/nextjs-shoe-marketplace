import Image from "next/image";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";

// Force the page to be dynamic (fetches on every request, not at build time)
export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 8,
  });

  const heroImage = products.data?.[0]?.images?.[0];

  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black px-8 py-14 sm:px-12 sm:py-20 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Text */}
            <div className="space-y-6">
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-neutral-300 backdrop-blur">
                New Collection
              </span>

              <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
                Premium products.
                <br />
                <span className="text-neutral-400">Designed to last.</span>
              </h1>

              <p className="max-w-md text-lg text-neutral-400">
                Curated items built with quality, precision, and modern design.
              </p>

              <Button
                asChild
                className="rounded-full bg-white px-8 py-6 text-black hover:bg-neutral-200"
              >
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>

            {/* Image */}
            <div className="relative mx-auto flex justify-center md:justify-end">
              {heroImage ? (
                <div className="relative">
                  <div className="absolute -inset-8 rounded-full bg-white/10 blur-3xl" />
                  <Image
                    src={heroImage}
                    alt="Featured product"
                    width={420}
                    height={420}
                    priority
                    className="relative rounded-3xl shadow-2xl"
                  />
                </div>
              ) : (
                <div className="flex h-[420px] w-[420px] items-center justify-center rounded-3xl bg-white/5 text-neutral-400">
                  No image available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl space-y-8 px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Featured Products
          </h2>

          <Link
            href="/products"
            className="text-sm text-neutral-500 hover:text-black"
          >
            View all →
          </Link>
        </div>

        <Carousel products={products.data} />
      </section>
    </div>
  );
}
