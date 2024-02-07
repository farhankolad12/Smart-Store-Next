"use client";

import "../globals.css";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useGetReq from "../hooks/useGetReq";
import ProductCom from "./ProductCom";
import ProductSkeleton from "./ProductSkeleton";

type ImgsType = {
  id: string;
  link: string;
};

type ShippingConfig = {
  isFree: boolean;
  price: number;
};

export type ReviewType = {
  _id: string;
  createdAt: Date;
  rating: number;
  review: string;
  title: string;
  userName: string;
  userEmail: string;
  firstName: string;
  lastName: string;
};

export type Variations = {
  id: string;
  name: string;
  discountedPrice: number;
  price: number;
  quantity: number;
};

export type ProductType = {
  _id: string;
  name: string;
  price: number;
  description: string;
  imgs: ImgsType[];
  discountedPrice: number;
  quantity: number;
  shippingConfig: ShippingConfig;
  subTotal: number;
  shippingTotal: number;
  img: string;
  id: string;
  reviews: ReviewType[];
  variations: { attributeName: string; lists: Variations[] };
  selectedVariantId: string;
  isWishlist: boolean | undefined;
};

export default function LatestProd() {
  const router = useRouter();

  const {
    error,
    loading,
    userData: products,
  } = useGetReq("/latest-products", {});

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
  }

  return (
    <div className="container">
      <div className="text-center d-flex flex-column gap-4">
        <span
          className="fs-5"
          style={{ textTransform: "uppercase", letterSpacing: "4px" }}
        >
          the latest
        </span>
        <h1>Smart Store Products</h1>
      </div>
      <div className="product-rows">
        {loading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : products && products.length ? (
          products.map((product: ProductType) => {
            return <ProductCom key={product._id} product={product} />;
          })
        ) : (
          ""
        )}
      </div>
      <button
        style={{ borderRadius: "20px" }}
        onClick={() => router.push("/shop")}
        className="btn btn-danger d-flex m-auto px-4 my-3"
      >
        VIEW ALL
      </button>
    </div>
  );
}
