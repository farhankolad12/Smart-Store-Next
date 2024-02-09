"use client";

import Link from "next/link";
import { ProductType } from "../components/LatestProd";
import { toast } from "react-toastify";
import useGetReq from "../hooks/useGetReq";
import ProductCom from "../components/ProductCom";
import ProductSkeleton from "../components/ProductSkeleton";
import AuthContext, { useAuth } from "../context/AuthContext";
import ToastProvider from "../components/ToastProvider";
import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import withAuth from "../utils/PrivateRoutes";

function Wishlist() {
  const { currentUser /* , brands, brandLoading */ } = useAuth();
  const router = useRouter();

  const { error, loading, userData: wishlists } = useGetReq("/wishlist", {});

  // const {
  //   error: _error,
  //   loading: _loading,
  //   userData: brands,
  // } = useGetReq("/brands", {});

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
  }

  return currentUser ? (
    <>
      <Header /* loading={brandLoading} brands={brands}  */ />
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
          &nbsp; - &nbsp; Your Wishlist
        </span>
      </div>
      <div className="container my-4">
        <h3 className="text-center fw-bold">Your Wishlist</h3>
        <div className="product-rows">
          {loading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : wishlists.length ? (
            wishlists.map((product: ProductType) => {
              return <ProductCom key={product._id} product={product} />;
            })
          ) : (
            <h3>Nothing in wishlist</h3>
          )}
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </>
  ) : (
    router.push("/login")
  );
}

export default withAuth(Wishlist);
