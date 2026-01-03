"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, openCart } = useCartStore();

  const count = items.reduce((a, i) => a + i.quantity, 0);

  useEffect(() => {
    if (window.innerWidth >= 768) setMobileOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={32} height={32} />
          <span className="font-semibold">Shoe Palace</span>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm text-neutral-600">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/products" className="hover:text-black">Products</Link>
          <Link href="/checkout" className="hover:text-black">Checkout</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative rounded-full p-2 hover:bg-black/5"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-black text-xs text-white flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/checkout">Checkout</Link>
        </div>
      )}
    </header>
  );
};
