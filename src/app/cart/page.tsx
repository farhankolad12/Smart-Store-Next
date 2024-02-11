"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";
import CartItemRow from "./components/CartItemRow";
import usePostReq from "../hooks/usePostReq";
import { toast } from "react-toastify";
import Header from "../components/Header";
import withAuth from "../utils/PrivateRoutes";

function Cart() {
  const [subTotal, setSubTotal] = useState(0);
  const [shippingTotal, setShippingTotal] = useState(0);

  const { cartItems } = useAuth();
  const router = useRouter();

  const { execute, loading } = usePostReq("/payments/create-session");

  async function handleCheckout() {
    try {
      const res = await execute({});
      if (res && !res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }

      if (res && res.success) {
        router.replace(res.url);
      }
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    setSubTotal(
      cartItems && cartItems.length
        ? cartItems.reduce(function (prev, current) {
            return current.variations.attributeName
              ? +current.variations.lists.filter(
                  (l) => l.id === current.selectedVariantId
                )[0].discountedPrice *
                  current.quantity +
                  prev
              : current.discountedPrice * current.quantity + prev;
          }, 0)
        : 0
    );

    setShippingTotal(
      cartItems && cartItems.length
        ? cartItems.reduce((prev, current) => {
            return current.shippingConfig.price &&
              prev > current.shippingConfig.price
              ? prev
              : current.shippingConfig.price || prev;
          }, 0)
        : 0
    );
  }, [cartItems]);

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
          &nbsp; - &nbsp; <span className="text-dark">Cart</span>
        </span>
      </div>
      <main className="container d-md-flex gap-4">
        <div className="first-div width-70 mt-5">
          <div className="border">
            <div className="py-3 px-2 border-bottom">
              <h4 className="text-uppercase fw-bold">shopping cart</h4>
            </div>
            {cartItems &&
              cartItems.length &&
              cartItems.map((item) => {
                return (
                  <CartItemRow
                    key={
                      item.selectedVariantId ? item.selectedVariantId : item._id
                    }
                    setShippingTotal={setShippingTotal}
                    setSubTotal={setSubTotal}
                    item={item}
                  />
                );
              })}
          </div>
          <button
            onClick={() => router.push("/shop")}
            className="btn my-2 p-0 d-flex gap-2 align-items-center"
          >
            <i className="bi bi-chevron-left fs-5" />
            <span>Continue shopping</span>
          </button>
        </div>
        <div className="second-div width-30 mt-5">
          <div className="border">
            <div className="py-4 px-3 border-bottom d-flex flex-column gap-2">
              <div className="d-flex justify-content-between">
                <span>{cartItems?.length} Items</span>
                <span>{formatCurrency(subTotal)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>{formatCurrency(shippingTotal)}</span>
              </div>
            </div>
            <div className="p-3">
              <div className="d-flex justify-content-between">
                <span>Total</span>
                <span>{formatCurrency(subTotal + shippingTotal)}</span>
              </div>
            </div>
            <div className="text-center py-4">
              <button
                disabled={loading}
                onClick={handleCheckout}
                className=" btn btn-danger px-5 rounded-pill fw-bold text-uppercase"
              >
                {loading ? "..." : "proceed to checkout"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default withAuth(Cart);
