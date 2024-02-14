"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import useGetReq from "../hooks/useGetReq";
import { ProductType } from "../components/LatestProd";

type CurrentUser = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number | string | undefined;
  type: string;
};

type ValueType = {
  currentUser: CurrentUser | undefined;
  setCurrentUser: Function;
  cartLoading: boolean;
  cartItems: ProductType[];
  error: string;
  setCartItems: Function;
  makeReq: number;
  setMakeReq: Function;
  filters: any;
  filtersLoading: boolean;
  _error: string;
};

const AuthProvider = React.createContext<ValueType>(null!);

export function useAuth() {
  return useContext(AuthProvider);
}

export default function AuthContext({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [makeReq, setMakeReq] = useState(0);

  const {
    loading: cartLoading,
    userData: cartItems,
    setUserData: setCartItems,
    error,
  } = useGetReq("/cart", { makeReq });

  const {
    error: _error,
    loading: _loading,
    userData: filters,
  } = useGetReq("/filters", {});

  async function authStateChange() {
    setLoading(true);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Access-Control-Allow-Origin",
      process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || ""
    );
    await fetch(process.env.NEXT_PUBLIC_BACKEND_HOSTNAME + "/check-auth", {
      credentials: "include",
      method: "GET",
      headers,
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.message) {
          return setCurrentUser(undefined);
        }
        setCurrentUser(data);
      })
      .catch(() => setCurrentUser(undefined))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    authStateChange();
  }, []);

  const value: ValueType = {
    currentUser,
    setCurrentUser,
    cartLoading,
    cartItems,
    setCartItems,
    error,
    makeReq,
    setMakeReq,
    filtersLoading: _loading,
    filters,
    _error,
  };

  return (
    <AuthProvider.Provider value={value}>
      {/* {(!loading || !cartLoading || !_loading) && children} */}
      {!loading && children}
    </AuthProvider.Provider>
  );
}
