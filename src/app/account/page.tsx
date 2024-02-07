"use client";

import { toast } from "react-toastify";
import useGetReq from "../hooks/useGetReq";
import AuthContext, { useAuth } from "../context/AuthContext";
import ToastProvider from "../components/ToastProvider";
import Header from "../components/Header";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import AccountPage from "../components/AccountPage";
import { useRouter } from "next/navigation";

export default function Wishlist() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const {
    error: _error,
    loading: _loading,
    userData: brands,
  } = useGetReq("/brands", {});

  if (_error) {
    toast.error(_error, {
      position: "top-right",
    });
  }

  return currentUser ? (
    <ToastProvider>
      <Header loading={_loading} brands={brands} />
      <AccountPage />
      <NewsLetter />
      <Footer />
    </ToastProvider>
  ) : (
    router.push("/login")
  );
}
