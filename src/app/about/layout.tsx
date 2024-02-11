import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Smart Store",
  description:
    "Welcome to Smart Store Watches, your go-to destination for a curated collection of timepieces that seamlessly blend style, innovation, and affordability. Established with a passion for watches of all kinds, Smart Store is more than a shop. it&apos;s an experience where every tick tells a story. Whether you&apos;re drawn to classic elegance, modern minimalism, or cutting-edge technology, we take pride in curating a selection that meets the unique preferences of our diverse clientele. Smart Store Watches is not just a shop; it&apos;s a community of watch enthusiasts. Follow us on social media, join our newsletter, and be the first to know about new arrivals, promotions, and exclusive offers. Let&apos;s share the excitement of timekeeping together. Thank you for choosing Smart Store Watches—where smart choices meet timeless elegance. Timepiece Diversity for Every Wrist At Smart Store, our mission is simple, to offer a diverse range of watches that cater to every taste. Hub for Watch Enthusiasts Smart Store Watches is more than a shop, it&apos;s a haven for watch enthusiasts. Affordable Luxury, Smart Choices We believe that everyone deserves to own a timepiece that reflects their individuality.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
