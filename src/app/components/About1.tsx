"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function About1() {
  const router = useRouter();

  return (
    <div className="container d-sm-flex justify-content-center gap-5 my-5">
      <Image
        src="https://fabulous-ishi.myshopify.com/cdn/shop/files/aboutus.png?v=1615320732"
        alt="About1"
        width={0}
        height={0}
        sizes="100%"
        style={{ width: "100%", height: "auto" }}
      />
      <div className="d-flex flex-column gap-3">
        <span
          style={{ textTransform: "uppercase", letterSpacing: "4px" }}
          className="fs-5"
        >
          The Products
        </span>
        <h1 className="fw-bold">All About Smart Store</h1>
        <p style={{ color: "#a5989d" }}>
          Smartwatches have become more of a necessity these days. But buying
          one has become a lot more difficult, considering the wide range of
          options available. If you browse online, you&apos;ll find Fossil,
          Samsung, Apple, Mi smart watches. Many smartwatches have built-in
          fitness features, such as a heart rate sensor and GPS. The Fitbit
          Versa is promoted as a health device rather than as a smartphone
          replacement.
        </p>
        <button
          onClick={() => router.push("/shop")}
          style={{ borderRadius: "20px" }}
          className="btn btn-danger me-auto px-4 py-2"
        >
          View more
        </button>
      </div>
    </div>
  );
}
