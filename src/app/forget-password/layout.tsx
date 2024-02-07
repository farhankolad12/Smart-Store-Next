import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password - Smart Store.",
  description: "Welcome to Smart Store Watches, reset your account.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
