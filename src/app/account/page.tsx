"use client";

import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import AccountPage from "../components/AccountPage";
import WithAuth from "../utils/PrivateRoutes";

const Account = () => {
  return (
    <>
      <Header /* loading={brandLoading} brands={brands} */ />
      <AccountPage />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default WithAuth(Account);
