import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All types Watches, Belts, Accessories & more.",
  description:
    "If you browse online, you’ll find Fossil, Samsung, Apple, Mi smart watches. Ship in 24 hours Shipping all over India in just 24hrs, 24 Months Warranty for watches upto 2 years, 7 Days Return Easy Return & Exchange, 100% Authenticity 100% Authenticated Watches",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
