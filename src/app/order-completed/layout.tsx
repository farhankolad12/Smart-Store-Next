import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Completed - Smart Store",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
