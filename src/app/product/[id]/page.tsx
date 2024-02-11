"use client";

import { useState, useEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/app/utils/formatCurrency";
import useGetReq from "../../hooks/useGetReq";
import Parser from "html-react-parser";
import CartButton from "@/app/components/CartButton";
import WishlistButton from "@/app/components/WishlistButton";
import ProductCom from "@/app/components/ProductCom";
import { ProductType } from "@/app/components/LatestProd";
import ProductPageSkeleton from "./components/ProductPageSkeleton";
import Header from "@/app/components/Header";
import NewsLetter from "@/app/components/NewsLetter";
import Footer from "@/app/components/Footer";

export default function Product() {
  const { id } = useParams();
  const { loading, userData: product } = useGetReq("/product", { id });

  const reviewsRef = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<any>();

  useEffect(() => {
    setSelectedImg(product ? product.imgs[0].link : "");
  }, [loading]);

  const sumOfRating = product?.reviews.reduce((prev: any, review: any) => {
    return prev + review.rating;
  }, 0);

  const rating = (sumOfRating * 5) / (product?.reviews.length * 5);

  return loading ? (
    <ProductPageSkeleton />
  ) : product ? (
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
          &nbsp; - &nbsp; {product.name}
        </span>
      </div>
      <main className="container">
        <div className="d-md-flex gap-5 justify-content-center mb-5">
          <div className="d-flex flex-column gap-4 mt-4 first-div">
            <div>
              <img
                width="100%"
                height="550px"
                src={selectedImg}
                alt="Product"
              />
            </div>
            <div className="d-flex gap-2 imgs-slider">
              {product.imgs.map((img: { id: string; link: string }) => {
                return (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImg(img.link)}
                    className="btn p-0"
                  >
                    <img
                      src={img.link}
                      alt="Product"
                      width="150px"
                      height="150px"
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-4 second-div">
            <h3 className="fw-bold pb-3 border-bottom">{product.name}</h3>
            {/* <>{Parser(product.description.slice(0, 200))}</> */}
            <div className="d-flex gap-3 align-items-center">
              <div className="border-end pe-3 mb-3">
                {[...Array(5)].map((star, index) => {
                  console.log(star);

                  index += 1;
                  return (
                    <button
                      key={index}
                      type="button"
                      className={
                        index <= rating
                          ? "text-warning btn p-0"
                          : "text-secondary btn p-0"
                      }
                    >
                      <span className="star fs-4">&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() =>
                  reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="d-flex gap-1 btn p-0"
              >
                <i className="bi bi-chat-left-text-fill fs-5" />
                <span>Read User Reviews</span>
                <span>({product.reviews.length})</span>
              </button>
            </div>
            {product.variations.attributeName ? (
              <div className="d-flex gap-4 align-items-center my-3">
                <del className="fs-5">
                  {formatCurrency(
                    selectedVariant
                      ? selectedVariant.price
                      : product.variations.lists[0].price
                  )}
                </del>
                <strong className="fs-4">
                  {formatCurrency(
                    selectedVariant
                      ? selectedVariant.discountedPrice
                      : product.variations.lists[0].discountedPrice
                  )}
                </strong>
              </div>
            ) : product.discountedPrice === product.price ? (
              <div className="my-3">
                <strong className="fs-5">
                  {formatCurrency(product.price)}
                </strong>
              </div>
            ) : (
              <div className="d-flex gap-4 align-items-center my-3">
                <del className="fs-5">{formatCurrency(product.price)}</del>
                <strong className="fs-4">
                  {formatCurrency(product.discountedPrice)}
                </strong>
              </div>
            )}
            <div className="btn p-0 mb-3">
              <WishlistButton product={product} /> Add to wishlist
            </div>
            {product.variations.attributeName && (
              <div>
                <label
                  className="fw-bold"
                  htmlFor={product.variations.attributeName}
                >
                  {product.variations.attributeName}:{" "}
                  {selectedVariant
                    ? selectedVariant.name
                    : product.variations.lists[0].name}
                </label>
                <select
                  id={product.variations.attributeName}
                  defaultValue={JSON.stringify(product.variations.lists[0])}
                  className="form-select my-2 w-auto"
                  onChange={(e) =>
                    setSelectedVariant(JSON.parse(e.target.value))
                  }
                >
                  {product.variations.lists.map((list: any) => {
                    return (
                      <option key={list.id} value={JSON.stringify(list)}>
                        {list.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            <div className="d-flex flex-column gap-4">
              <div className="d-flex flex-column gap-1">
                <label htmlFor="quantity" className="fw-bold">
                  Quantity
                </label>
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(+e.target.value)}
                  type="number"
                  // defaultValue="1"
                  min="1"
                  className="form-control w-50"
                />
              </div>
              <CartButton
                selectedVariant={
                  product.variations.attributeName
                    ? selectedVariant || product.variations.lists[0]
                    : undefined
                }
                display=""
                product={product}
                quantity={quantity}
              />
            </div>
            <div className="card card-body mt-5">
              <div className="d-flex flex-column gap-4 ">
                <div className="d-flex flex-column justify-content-between flex-lg-row gap-4">
                  <div className="d-flex gap-3 align-items-center">
                    <i className="bi bi-bullseye text-secondary  fs-1" />
                    <div>
                      <strong>Ship in 24 hours</strong>
                      <p className="text-secondary">
                        Shipping all over India in just 24hrs
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <i className="bi bi-shop text-secondary  fs-1" />
                    <div>
                      <strong>24 Months Warranty</strong>
                      <p className="text-secondary">
                        Warranty for watches upto 2 years
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-between flex-lg-row gap-4">
                  <div className="d-flex gap-3 align-items-center">
                    <i className="bi bi-arrow-left-right text-secondary  fs-1" />
                    <div>
                      <strong>7 Days Return</strong>
                      <p className="text-secondary">Easy Return & Exchange</p>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <i className="bi bi-award text-secondary  fs-1" />
                    <div>
                      <strong>100% Authenticity</strong>
                      <p className="text-secondary">
                        100% Authenticated Watches
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="description-tab"
                data-bs-toggle="pill"
                data-bs-target="#description"
                type="button"
                role="tab"
                aria-controls="description"
                aria-selected="true"
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="details-tab"
                data-bs-toggle="pill"
                data-bs-target="#details"
                type="button"
                role="tab"
                aria-controls="details"
                aria-selected="false"
              >
                Product Details
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="description"
              role="tabpanel"
              aria-labelledby="description-tab"
              tabIndex={0}
            >
              <div className="border p-5">{Parser(product.description)}</div>
            </div>
            <div
              className="tab-pane fade"
              id="details"
              role="tabpanel"
              aria-labelledby="details-tab"
              tabIndex={0}
            >
              <div className="p-5 text-center">
                <span>In Stock: </span>
                <strong>
                  {product.quantity
                    ? product.quantity
                    : product.variations.lists.reduce(
                        (total: number, list: any) => {
                          return (total += list.quantity);
                        },
                        0
                      )}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div ref={reviewsRef} className="my-5">
          <div className="border d-flex align-items-center justify-content-between bg-light p-3">
            <div className="d-flex align-items-center gap-1">
              <i className="bi bi-chat-left-text-fill fs-4" />
              <span>Comments</span>
              <span>({product.reviews.length})</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span>Grade</span>
              <div>
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  console.log(star);

                  return (
                    <button
                      key={index}
                      type="button"
                      className={
                        index <= rating
                          ? "text-warning btn p-0"
                          : "text-secondary btn p-0"
                      }
                    >
                      <span className="star fs-4">&#9733;</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border p-4 d-flex flex-column gap-5">
            {product.reviews.map((review: any) => {
              return (
                <div
                  key={review._id}
                  className="d-flex gap-5 align-items-center border-bottom pb-3"
                >
                  <div className="d-flex flex-column gap-2">
                    <div>
                      {[...Array(5)].map((star, index) => {
                        index += 1;
                        console.log(star);

                        return (
                          <button
                            key={index}
                            type="button"
                            className={
                              index <= review.rating
                                ? "text-warning btn p-0"
                                : "text-secondary btn p-0"
                            }
                          >
                            <span className="star fs-4">&#9733;</span>
                          </button>
                        );
                      })}
                    </div>
                    <span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      By {review.firstName} {review.lastName}
                    </span>
                  </div>
                  <div className="d-flex flex-column gap-2 ms-5">
                    <strong>{review.title}</strong>
                    <p>{review.review}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="text-center header d-flex flex-column gap-2 my-3 py-4 ">
            <span
              style={{ letterSpacing: "2px" }}
              className="text-uppercase text-secondary fs-5"
            >
              smart store
            </span>
            <h2 className="fw-bold fs-1">Products you may like</h2>
          </div>
          <div className="product-rows">
            {loading
              ? "loading"
              : product && product.suggestedProducts
              ? product.suggestedProducts.map((product: ProductType) => {
                  return <ProductCom key={product._id} product={product} />;
                })
              : "No product to show!"}
          </div>
        </div>
      </main>
      <NewsLetter />
      <Footer />
    </>
  ) : (
    notFound()
  );
}
