import "./globals.css";
import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";
import { PageTransition } from "@/components/page-transition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <CartDrawer />
      </body>
    </html>
  );
}
