"use client";

import { toast } from "react-toastify";
import AuthContext, { useAuth } from "../context/AuthContext";
import ToastProvider from "../components/ToastProvider";
import Header from "../components/Header";
import useGetReq from "../hooks/useGetReq";
import SignupPage from "./components/SignupPage";

export default function Signup() {
  // const { brands, brandLoading } = useAuth();

  // const {
  //   error: error,
  //   loading: _loading,
  //   userData: brands,
  // } = useGetReq("/brands", {});

  // if (error) {
  //   toast.error(error, {
  //     position: "top-right",
  //   });
  // }

  return (
    <>
      <Header /* brands={brands} loading={brandLoading} */ />
      <SignupPage />
    </>
  );
}
