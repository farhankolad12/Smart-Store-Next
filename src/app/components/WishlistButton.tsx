"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import usePostReq from "../hooks/usePostReq";
import { ProductType } from "./LatestProd";
import { useState } from "react";

export default function WishlistButton({ product }: { product: ProductType }) {
  const [isWish, setIsWish] = useState(product.isWishlist);

  const { currentUser } = useAuth();
  const router = useRouter();

  const { execute: toggleWishlist, loading } = usePostReq("/handle-wishlist");

  async function handleWishlist() {
    try {
      const res = await toggleWishlist({ productId: product._id });

      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }

      setIsWish((prev) => !prev);

      toast.success("Changes saved!", {
        position: "top-right",
      });
    } catch (err: any) {
      toast.error(err.message, { position: "top-right" });
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        currentUser ? handleWishlist() : router.push("/login");
      }}
      style={{ width: "35px", height: "35px" }}
      className="btn p-0 btn-outline-danger rounded-circle"
    >
      {loading ? (
        "..."
      ) : (
        <i className={`bi bi-heart${isWish ? "-fill" : ""}`} />
      )}
    </button>
  );
}
