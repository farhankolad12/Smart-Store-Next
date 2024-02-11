"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import useGetReq from "../hooks/useGetReq";
import SingleAddress from "./components/SingleAddress";
import Header from "../components/Header";
import withAuth from "../utils/PrivateRoutes";

export type AddressType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
};

function Address() {
  const router = useRouter();

  const {
    error,
    loading,
    userData: addresses,
    setUserData: setAddresses,
  } = useGetReq("/get-address", { id: "0" });

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
  }

  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          background: "url(&apos;/assets/banner.jpg&apos;) no-repeat top",
          backgroundAttachment: "fixed",
          padding: "70px 15px",
        }}
      >
        <span className="fw-bold">
          <Link style={{ color: "#000" }} href="/">
            Home
          </Link>{" "}
          &nbsp; - &nbsp;{" "}
          <Link className="text-dark" href="/account">
            Your Account
          </Link>{" "}
          &nbsp; - &nbsp; Address
        </span>
      </div>
      <div className="container my-5">
        <h3 className="fw-bold text-center">Your Addresses</h3>
        <div className="border p-5 mt-4">
          {loading
            ? "loading..."
            : addresses
            ? addresses.map((addr: AddressType) => {
                return (
                  <SingleAddress
                    setAddresses={setAddresses}
                    key={addr.id}
                    addr={addr}
                  />
                );
              })
            : "No address found"}

          <button
            onClick={() => router.push("/add-address/0")}
            className="btn p-0 d-flex gap-2 align-items-center"
          >
            <i className="bi bi-plus" />
            <span>Create new address</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default withAuth(Address);
