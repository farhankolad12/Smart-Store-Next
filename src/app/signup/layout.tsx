import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup - Smart Store.",
  description: "Welcome to Smart Store Watches, Signup for a new account.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
