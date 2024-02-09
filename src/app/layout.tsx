import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./context/AuthContext";
import ToastProvider from "./components/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Store - Buy Watches, Belts, Accessories & more.",
  description:
    "Welcome to Smart Store Watches, your go-to destination for a curated collection of timepieces that seamlessly blend style, innovation, and affordability. Established with a passion for watches of all kinds, Smart Store is more than a shop. it's an experience where every tick tells a story. Smartwatches have become more of a necessity these days. But buying one has become a lot more difficult, considering the wide range of options available. If you browse online, you’ll find Fossil, Samsung, Apple, Mi smart watches.",
  icons: "/favicon.jpeg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="_xxeHlzKZhb3K06QtCusVrMjjzs83oyQsuEHVxIw5x0"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link rel="canonical" href="https://www.smart-store.co.in/" />
      </head>

      <body className={inter.className}>
        <AuthContext>
          <ToastProvider>{children}</ToastProvider>
        </AuthContext>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
