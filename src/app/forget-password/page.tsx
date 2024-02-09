"use client";

import { toast } from "react-toastify";
import Header from "../components/Header";
import useGetReq from "../hooks/useGetReq";
import ForgetPasswordPage from "./components/ForgetPasswordPage";
import { useAuth } from "../context/AuthContext";

export default function Login() {
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
      <ForgetPasswordPage />
    </>
  );
}
