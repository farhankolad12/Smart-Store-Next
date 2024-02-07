"use client";

import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import ToastProvider from "../../components/ToastProvider";
import Header from "../../components/Header";
import useGetReq from "../../hooks/useGetReq";
import ResetPasswordPage from "./components/ResetPasswordPage";

export default function Login({ params }: { params: { id: string } }) {
  const {
    error: error,
    loading: _loading,
    userData: brands,
  } = useGetReq("/brands", {});

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
  }
  return (
    <AuthContext>
      <ToastProvider>
        <Header brands={brands} loading={_loading} />
        <ResetPasswordPage id={params.id} />
      </ToastProvider>
    </AuthContext>
  );
}
