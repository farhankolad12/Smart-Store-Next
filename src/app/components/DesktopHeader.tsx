"use client";

import "../globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
// import CartCanvas from "../Home/CartCanvas";
import { useAuth } from "../context/AuthContext";
import useGetReq from "../hooks/useGetReq";
import { toast } from "react-toastify";
import { useRef } from "react";
import CartCanvas from "./CartCanvas";

export default function DesktopHeader(/* { brands }: { brands: any } */) {
  const { cartItems } = useAuth();

  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  // const { error, loading, userData: categories } = useGetReq("/categories", {});

  const { currentUser, filters, filtersLoading } = useAuth();

  // if (error) {
  //   toast.error(error, {
  //     position: "top-right",
  //   });
  // }

  return (
    <>
      <div className="py-3 container desktop-header">
        <Logo />
        <div className="d-flex align-items-center gap-3 ">
          <div className="dropdown">
            <button className="dropbtn btn p-0">Watches</button>
            <div className="dropdown-content p-3">
              <div className="d-flex justify-content-between gap-5">
                {filtersLoading
                  ? ""
                  : filters.categories &&
                    filters.categories.map((cat: any) => {
                      return (
                        <div key={cat.name}>
                          <strong className="fs-5 border-bottom pb-2">
                            {cat.name}
                          </strong>
                          <div className="d-flex flex-column gap-3 mt-3">
                            {filtersLoading
                              ? "loading..."
                              : filters.brands &&
                                filters.brands.map(
                                  (brand: { name: string }) => {
                                    return (
                                      <Link
                                        href={`/shop?brands=${brand.name.toLowerCase()}&collections=${cat.name
                                          .split(" ")[0]
                                          .toLowerCase()}`}
                                        key={brand.name}
                                        className="text-dark"
                                      >
                                        {brand.name}
                                      </Link>
                                    );
                                  }
                                )}
                          </div>
                        </div>
                      );
                    })}
              </div>
              <img
                src="https://fabulous-ishi.myshopify.com/cdn/shop/files/watch1.png?v=1615320735"
                alt="bg"
                width="100%"
                className="mt-3"
              />
            </div>
          </div>
          <Link className="text-dark" href="/shop">
            Shop
          </Link>
          <Link className="text-dark" href="/about">
            About us
          </Link>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            data-bs-toggle="collapse"
            data-bs-target="#search-icon"
            aria-expanded="false"
            aria-controls="search-icon"
            className="btn p-0 border-none"
          >
            <i className="bi bi-search fs-5" />
          </button>
          <div className="collapse collapse-horizontal" id="search-icon">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = searchRef.current?.value;
                if (q) router.push(`/shop?q=${q}`);
              }}
            >
              <input
                ref={searchRef}
                placeholder="Enter..."
                type="text"
                className="form-control"
              />
            </form>
          </div>
          <button
            onClick={() => router.push(currentUser ? "/account" : "/login")}
            className="btn p-0 border-none"
          >
            <i className="bi bi-person fs-5" />
          </button>
          <div className="position-relative">
            <button
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartCanvas"
              aria-controls="cartCanvas"
              className="btn p-0 border-none"
            >
              <i className="bi bi-cart fs-5" />
            </button>
            {cartItems && cartItems.length > 0 && (
              <span
                className="position-absolute bg-danger text-light rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "20px",
                  height: "20px",
                  top: "-.4rem",
                  right: "-.8rem",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </div>
      <CartCanvas />
    </>
  );
}
