"use client";

import { useState, useRef } from "react";
import { ProductType } from "./LatestProd";
import { formatCurrency } from "../utils/formatCurrency";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Parser from "html-react-parser";
import usePostReq from "../hooks/usePostReq";
import Image from "next/image";

export default function ProductPreview({
  product,
  selectedVariant,
}: {
  product: ProductType;
  selectedVariant: any;
}) {
  const [selectedImg, setSelectedImg] = useState(product.imgs[0].link);

  const quantityRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const { currentUser, setCartItems } = useAuth();

  const { execute, loading } = usePostReq("/handle-cart");

  async function handleCart() {
    try {
      const res = await execute({
        productId: product._id,
        quantity: quantityRef.current?.value,
        selectedVariantId: product.variations.lists[0].id,
      });

      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }

      setCartItems((prev: ProductType[]) => {
        const prevSubTotal = prev.length
          ? prev.reduce(function (prev, current) {
              return prev.subTotal > current.subTotal ? prev : current;
            }).subTotal
          : 0;

        const prevShippingTotal = prev.length
          ? prev.reduce(function (prev, current) {
              return prev.shippingTotal > current.shippingTotal
                ? prev
                : current;
            }).shippingTotal
          : 0;
        if (
          prev.length === 0 ||
          (prev.every((item) => item._id !== product._id) &&
            prev.every(
              (item) => item.selectedVariantId !== selectedVariant?.id
            ))
        ) {
          return [
            ...prev,
            {
              ...product,
              selectedVariantId: selectedVariant?.id,
              quantity: 1,
              subTotal: product.variations.attributeName
                ? +product.variations.lists.filter(
                    (l) => l.id === selectedVariant?.id
                  )[0].discountedPrice + prevSubTotal
                : product.discountedPrice + prevSubTotal,
              shippingTotal: product.shippingConfig.price
                ? product.shippingConfig.price
                : 0 + prevShippingTotal,
            },
          ];
        }

        if (
          prev.length === 0 ||
          (prev.some((item) => item._id === product._id) &&
            prev.some((item) => item.selectedVariantId === selectedVariant?.id))
        ) {
          return prev.map((cartItem) => {
            if (
              cartItem._id === product._id &&
              cartItem.selectedVariantId === product.selectedVariantId
            ) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                subTotal: product.variations.attributeName
                  ? +product.variations.lists.filter(
                      (l) => l.id === selectedVariant.id
                    )[0].discountedPrice + prevSubTotal
                  : product.discountedPrice + prevSubTotal,
                shippingTotal: prevShippingTotal,
              };
            }
            return cartItem;
          });
        }

        if (
          prev.length === 0 ||
          (prev.some((item) => item._id === product._id) &&
            prev.some((item) => item.selectedVariantId !== selectedVariant?.id))
        ) {
          return [
            ...prev,
            {
              ...product,
              selectedVariantId: selectedVariant.id,
              quantity: 1,
              subTotal: product.variations.attributeName
                ? +product.variations.lists.filter(
                    (l) => l.id === selectedVariant.id
                  )[0].discountedPrice + prevSubTotal
                : product.discountedPrice + prevSubTotal,
              shippingTotal: product.shippingConfig.price
                ? product.shippingConfig.price
                : 0 + prevShippingTotal,
            },
          ];
        }

        if (
          prev.length === 0 ||
          prev.every((item) => item._id !== product._id)
        ) {
          return [
            ...prev,
            {
              ...product,
              selectedVariantId: undefined,
              quantity: 1,
              subTotal: product.variations.attributeName
                ? +product.variations.lists.filter(
                    (l) => l.id === selectedVariant?.id
                  )[0].discountedPrice + prevSubTotal
                : product.discountedPrice + prevSubTotal,
              shippingTotal: product.shippingConfig.price
                ? product.shippingConfig.price
                : 0 + prevShippingTotal,
            },
          ];
        }

        if (
          prev.length === 0 ||
          prev.some((item) => item._id === product._id)
        ) {
          return prev.map((cartItem) => {
            if (cartItem._id === product._id) {
              return {
                ...cartItem,
                quantity: ++cartItem.quantity,
                subTotal: product.variations.attributeName
                  ? +product.variations.lists.filter(
                      (l) => l.id === selectedVariant.id
                    )[0].discountedPrice + prevSubTotal
                  : product.discountedPrice + prevSubTotal,
                shippingTotal: prevShippingTotal,
              };
            }
            return cartItem;
          });
        }

        if (
          prev.length === 0 ||
          prev.some((item) => item._id === product._id)
        ) {
          return [
            ...prev,
            {
              ...product,
              selectedVariantId: undefined,
              quantity: 1,
              subTotal: product.variations.attributeName
                ? +product.variations.lists.filter(
                    (l) => l.id === selectedVariant.id
                  )[0].discountedPrice + prevSubTotal
                : product.discountedPrice + prevSubTotal,
              shippingTotal: product.shippingConfig.price
                ? product.shippingConfig.price
                : 0 + prevShippingTotal,
            },
          ];
        }
      });

      toast.success("Added to cart!", {
        position: "top-right",
      });
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  }

  return (
    <div
      className="modal fade"
      id={`p_${product._id}`}
      tabIndex={-1}
      aria-labelledby={`p_${product._id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-body">
            <div className="d-md-flex preview-modal gap-5 w-100">
              <div className="d-flex first my-3 flex-column gap-2">
                <Image
                  width={0}
                  height={0}
                  sizes="100%"
                  style={{ width: "100%", height: "auto" }}
                  src={selectedImg}
                  alt="Product"
                />
                <div className="d-flex gap-4 overflow-y-hidden">
                  {product.imgs.map((img) => {
                    return (
                      <button
                        onClick={() => setSelectedImg(img.link)}
                        className="btn"
                        key={img.id}
                      >
                        <Image
                          width={0}
                          height={0}
                          sizes="100%"
                          style={{ width: "100%", height: "100px" }}
                          // style={{ height: "100px" }}
                          src={img.link}
                          alt="Product"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex second flex-column gap-3 my-3">
                <div className="border-bottom pb-3">
                  <strong className="fs-4">{product.name}</strong>
                </div>

                {product.variations.attributeName &&
                product.variations.lists[0].discountedPrice ===
                  product.variations.lists[0].price ? (
                  <strong className="fs-4">
                    {formatCurrency(product.variations.lists[0].price)}
                  </strong>
                ) : product.variations.lists[0]?.discountedPrice !==
                  product.variations.lists[0]?.price ? (
                  <div className="d-flex gap-3 align-items-center my-2">
                    <del className="fs-5">
                      {formatCurrency(product.variations.lists[0]?.price)}
                    </del>
                    <strong className="fs-4">
                      {formatCurrency(
                        product.variations.lists[0]?.discountedPrice
                      )}
                    </strong>
                  </div>
                ) : (
                  ""
                )}

                {product.discountedPrice &&
                product.discountedPrice === product.price ? (
                  <strong className="fs-4">
                    {formatCurrency(product.price)}
                  </strong>
                ) : product.discountedPrice !== product.price ? (
                  <div className="d-flex gap-3 align-items-center my-2">
                    <del className="fs-5">{formatCurrency(product.price)}</del>
                    <strong className="fs-4">
                      {formatCurrency(product.discountedPrice)}
                    </strong>
                  </div>
                ) : (
                  ""
                )}
                {Parser(product.description)}
                <div className="d-flex gap-4 align-items-end">
                  <div className="d-flex flex-column gap-2">
                    <label htmlFor="quantity" className="fw-bold">
                      Quantity
                    </label>
                    <input
                      ref={quantityRef}
                      type="number"
                      id="quantity"
                      min={1}
                      className="form-control"
                      defaultValue={1}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger rounded-pill px-5 fw-bold text-uppercase"
                    onClick={(e) => {
                      e.preventDefault();
                      currentUser ? handleCart() : router.push("/login");
                    }}
                  >
                    {loading ? "loading..." : "add to cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}
