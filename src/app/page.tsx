"use client";

import { toast } from "react-toastify";
import About1 from "./components/About1";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import LatestProd from "./components/LatestProd";
import OurServices from "./components/OurServices";
import AuthContext, { useAuth } from "./context/AuthContext";
import useGetReq from "./hooks/useGetReq";
import Footer from "./components/Footer";
import NewsLetter from "./components/NewsLetter";
import ToastProvider from "./components/ToastProvider";
import CustomerReviews from "./components/CustomerReviews";
import ShopByBrands from "./components/ShopByBrands";

export default function Home() {
  const { _error: filtersError } = useAuth();

  if (filtersError) {
    toast.error(filtersError, {
      position: "top-right",
    });
  }

  return (
    <>
      <Header /* loading={brandLoading} brands={brands} */ />
      <main>
        <article>
          <Carousel />
          <About1 />
          <OurServices />
          <LatestProd />
          <CustomerReviews />
          <ShopByBrands /* brands={brands} loading={brandLoading} */ />
        </article>
      </main>

      <NewsLetter />
      <Footer />
    </>
  );
}
