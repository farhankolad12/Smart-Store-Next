"use client";

import React from "react";
import AuthContext, { useAuth } from "../context/AuthContext";
import ToastProvider from "../components/ToastProvider";
import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import useGetReq from "../hooks/useGetReq";
import { toast } from "react-toastify";
import Link from "next/link";
import ShopPage from "./components/ShopPage";

export default function Shop() {
  // const { brands, brandLoading } = useAuth();

  // const {
  //   error: error,
  //   loading: loading,
  //   userData: brands,
  // } = useGetReq("/brands", {});

  // if (error) {
  //   toast.error(error, {
  //     position: "top-right",
  //   });
  // }

  return (
    <>
      <Header /* loading={brandLoading} brands={brands} */ />
      <article
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          background: "url('/assets/banner.jpg') no-repeat top",
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
      <ShopPage />
      <NewsLetter />
      <Footer />
    </>
  );
}
