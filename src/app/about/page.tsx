"use client";

import React from "react";
import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import useGetReq from "../hooks/useGetReq";
import { toast } from "react-toastify";
import Link from "next/link";
import AboutPage from "./components/AboutPage";
import { useAuth } from "../context/AuthContext";

export default function About() {
  // const { brands, brandLoading } = useAuth();

  return (
    <>
      <Header /* loading={brandLoading} brands={brands} */ />
      <article
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          background: "url(&apos;/assets/banner.jpg&apos;) no-repeat top",
          backgroundAttachment: "fixed",
          padding: "70px 15px",
        }}
      >
        <strong className="fw-bold">
          <Link style={{ color: "#000" }} href="/">
            Home
          </Link>{" "}
          &nbsp; - &nbsp; Collection
        </strong>
      </article>
      <AboutPage />
      <NewsLetter />
      <Footer />
    </>
  );
}
