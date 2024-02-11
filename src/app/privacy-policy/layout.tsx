import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Smart Store",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
