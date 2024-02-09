"use client";

import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import WithAuth from "../utils/PrivateRoutes";
import OrdersPage from "./components/OrdersPage";
// import IdentityPage from "./components/IdentityPage";

const Orders = () => {
  return (
    <>
      <Header />
      <OrdersPage />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default WithAuth(Orders);
