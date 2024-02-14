"use client";

import { FormEvent, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import usePostReq from "@/app/hooks/usePostReq";
import { toast } from "react-toastify";
import useGetReq from "@/app/hooks/useGetReq";
import withAuth from "@/app/utils/PrivateRoutes";
import Header from "@/app/components/Header";

function AddAddress() {
  const { id } = useParams();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const address1Ref = useRef<HTMLInputElement>(null);
  const address2Ref = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const pincodeRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const { execute, loading } = usePostReq("/add-address");

  const {
    error,
    loading: addrLoading,
    userData: address,
  } = useGetReq("/get-address", { id });

  const router = useRouter();

  if (error) {
    toast.error(error, { position: "top-right" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({
        id: address ? address.id : "",
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        email: emailRef.current?.value,
        address1: address1Ref.current?.value,
        address2: address2Ref.current?.value,
        city: cityRef.current?.value,
        state: stateRef.current?.value,
        pincode: pincodeRef.current?.value,
        phone: phoneRef.current?.value,
      });

      if (!res.success) {
        return toast.error(res.message, { position: "top-right" });
      }

      toast.success("Changes saved!", { position: "top-right" });

      router.push("/address");
    } catch (err: any) {
      return toast.error(err.message, {
        position: "top-right",
      });
    }
  }

  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          background: "url('/assets/banner.jpg') no-repeat top",
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
          &nbsp; - &nbsp; Address &nbsp; - &nbsp;{" "}
          {address ? "Edit Address" : "New Address"}
        </span>
      </div>
      <div className="container my-4">
        <h3 className="fw-bold text-center mb-4">
          {address ? "Edit Address" : "New Address"}
        </h3>
        {addrLoading ? (
          "loading"
        ) : (
          <form onSubmit={handleSubmit} className="border p-5">
            <div className="d-flex flex-column gap-4 justify-content-center">
              <div className="d-md-flex gap-4 align-items-center">
                <label className="w-100" htmlFor="fname">
                  First name
                </label>
                <input
                  defaultValue={address ? address.firstName : ""}
                  required
                  ref={firstNameRef}
                  type="text"
                  className="form-control"
                  id="fname"
                />
              </div>
              <div className="d-md-flex gap-4 align-items-center">
                <label className="w-100" htmlFor="lname">
                  Last name
                </label>
                <input
                  defaultValue={address ? address.lastName : ""}
                  required
                  ref={lastNameRef}
                  type="text"
                  className="form-control"
                  id="lname"
                />
              </div>
              <div className="d-md-flex gap-4 align-items-center">
                <label className="w-100" htmlFor="email">
                  Email
                </label>
                <input
                  defaultValue={address ? address.email : ""}
                  required
                  ref={emailRef}
                  type="text"
                  className="form-control"
                  id="email"
                />
              </div>
              <div className="d-md-flex gap-4 align-items-center">
                <label className="w-100" htmlFor="addr1">
                  Address 1
                </label>
                <input
                  required
                  defaultValue={address ? address.address1 : ""}
                  ref={address1Ref}
                  type="text"
                  className="form-control"
                  id="addr1"
                />
              </div>
              <div className="d-md-flex gap-4 align-items-center">
                <label className="w-100" htmlFor="addr2">
                  Address 2
                </label>
                <input
                  required
                  defaultValue={address ? address.address2 : ""}
                  ref={address2Ref}
                  type="text"
                  className="form-control"
                  id="addr2"
                />
              </div>
              <div className="d-md-flex gap-4 align-items-center">
                <label className="w-100" htmlFor="city">
                  City
                </label>
                <input
                  required
                  defaultValue={address ? address.city : ""}
                  ref={cityRef}
                  type="text"
                  className="form-control"
                  id="city"
                />
              </div>
              <div className="d-md-flex gap-4 align-items-center">
                <label className="w-100" htmlFor="state">
                  State
                </label>
                <input
                  required
                  defaultValue={address ? address.state : ""}
                  ref={stateRef}
                  type="text"
                  className="form-control"
                  id="state"
                />
              </div>
              <div className="d-md-flex gap-4 align-items-center">
                <label className="w-100" htmlFor="pincode">
                  Pincode
                </label>
                <input
                  required
                  ref={pincodeRef}
                  defaultValue={address ? address.pincode : ""}
                  type="text"
                  className="form-control"
                  id="pincode"
                />
              </div>
              <div className="d-md-flex gap-4 align-items-center">
                <label className="w-100" htmlFor="phone">
                  Phone
                </label>
                <input
                  required
                  ref={phoneRef}
                  defaultValue={address ? address.phone : ""}
                  type="text"
                  className="form-control"
                  id="phone"
                />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-danger text-uppercase rounded-pill px-4 me-auto mt-4"
            >
              {loading ? "loading..." : "save"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default withAuth(AddAddress);
