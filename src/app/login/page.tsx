"use client";

import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import ToastProvider from "../components/ToastProvider";
import Header from "../components/Header";
import useGetReq from "../hooks/useGetReq";
import LoginPage from "./components/LoginPage";

export default function Login() {
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
        <LoginPage />
      </ToastProvider>
    </AuthContext>
  );
}
