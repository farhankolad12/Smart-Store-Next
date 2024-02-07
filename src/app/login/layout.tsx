import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Smart Store.",
  description: "Welcome to Smart Store Watches, login to your account.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
