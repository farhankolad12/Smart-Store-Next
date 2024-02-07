"use client";

import { toast } from "react-toastify";
import About1 from "./components/About1";
import Carousel from "./components/Carousel";
import Header from "./components/Header";
import LatestProd from "./components/LatestProd";
import OurServices from "./components/OurServices";
import AuthContext from "./context/AuthContext";
import useGetReq from "./hooks/useGetReq";
import Footer from "./components/Footer";
import NewsLetter from "./components/NewsLetter";
import ToastProvider from "./components/ToastProvider";
import CustomerReviews from "./components/CustomerReviews";
import ShopByBrands from "./components/ShopByBrands";

export default function Home() {
  const {
    error: error,
    loading: loading,
    userData: brands,
  } = useGetReq("/brands", {});

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
  }

  return (
    <ToastProvider>
      <Header loading={loading} brands={brands} />
      <main>
        <article>
          <Carousel />
          <About1 />
          <OurServices />
          <LatestProd />
          <CustomerReviews />
          <ShopByBrands brands={brands} loading={loading} />
        </article>
      </main>

      <NewsLetter />
      <Footer />
    </ToastProvider>
  );
}
