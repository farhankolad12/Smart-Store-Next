"use client";

import { toast } from "react-toastify";
import AuthContext, { useAuth } from "../../context/AuthContext";
import ToastProvider from "../../components/ToastProvider";
import Header from "../../components/Header";
import useGetReq from "../../hooks/useGetReq";
import ResetPasswordPage from "./components/ResetPasswordPage";

export default function ResetPassword({ params }: { params: { id: string } }) {
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
      <ResetPasswordPage id={params.id} />
    </>
  );
}
