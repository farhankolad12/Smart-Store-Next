"use client";

import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import WithAuth from "../utils/PrivateRoutes";
import IdentityPage from "./components/IdentityPage";

const Identity = () => {
  return (
    <>
      <Header />
      <IdentityPage />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default WithAuth(Identity);
