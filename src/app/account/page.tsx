"use client";

import { toast } from "react-toastify";
import useGetReq from "../hooks/useGetReq";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import AccountPage from "../components/AccountPage";
import { useRouter } from "next/navigation";
import WithAuth from "../utils/PrivateRoutes";

const Account = () => {
  const { currentUser /* , brandLoading, brands */ } = useAuth();
  const router = useRouter();

  // const {
  //   error: _error,
  //   loading: _loading,
  //   userData: brands,
  // } = useGetReq("/brands", {});

  // if (_error) {
  //   toast.error(_error, {
  //     position: "top-right",
  //   });
  // }

  return currentUser ? (
    <>
      <Header /* loading={brandLoading} brands={brands} */ />
      <AccountPage />
      <NewsLetter />
      <Footer />
    </>
  ) : (
    router.push("/login")
  );
};

export default WithAuth(Account);
