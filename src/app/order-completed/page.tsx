"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import withAuth from "../utils/PrivateRoutes";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderCompleted() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          background: "url('/assets/banner.jpg') no-repeat top",
          backgroundAttachment: "fixed",
          padding: "70px 15px",
        }}
      >
        <span className="fw-bold">
          <Link style={{ color: "#000" }} href="/">
            Home
          </Link>{" "}
          &nbsp; - &nbsp; <span className="text-dark">Order Completed</span>
        </span>
      </div>
      <main className="container py-5 text-center">
        <h2
          style={{ letterSpacing: "1.5px" }}
          className="fw-bold fs-1 text-uppercase"
        >
          thank you!
        </h2>
        <p className="my-3 px-5">
          We are getting started on your order right away, and you will receive
          an order confirmation email shortly. In the meantime, explore the
          latest fashion and get inspired by new trends, just head over to{" "}
          <Link href="/shop" className="text-dark">
            Smart Store
          </Link>
        </p>
        <button
          onClick={() => router.push("/orders")}
          className="px-5 btn btn-dark py-2 fs-5 mt-4"
        >
          View Orders
        </button>
      </main>
      <Footer />
    </>
  );
}

export default withAuth(OrderCompleted);
