import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "../utils/formatCurrency";
import { ProductType } from "./LatestProd";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
import RatingCom from "./RatingCom";
import ProductPreview from "./ProductPreview";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

export default function ProductCom({ product }: { product: ProductType }) {
  const { currentUser } = useAuth();

  const router = useRouter();

  return (
    <>
      <Link
        href={`/product/${product._id}`}
        className="text-dark bg-light mt-3 product-com position-relative"
        style={{ zIndex: "1" }}
      >
        <div
          className="position-absolute d-flex flex-column gap-2 d-none actions animate__animated animate__slideInRight"
          style={{ top: "1rem", right: "1rem", zIndex: "1" }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            style={{ width: "35px", height: "35px" }}
            className="btn p-0 btn-outline-danger rounded-circle"
            data-bs-toggle="modal"
            data-bs-target={`#p_${product._id}`}
          >
            <i className="bi bi-eye" />
          </button>
          {currentUser ? (
            <WishlistButton product={product} />
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/login");
              }}
              style={{ width: "35px", height: "35px" }}
              className="btn p-0 btn-outline-danger rounded-circle"
            >
              <i className="bi bi-heart" />
            </button>
          )}
        </div>
        <div className="d-flex flex-column h-100 justify-content-between">
          <Image
            src={product.imgs[0].link}
            alt="Product"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
            className="first-img animate__animated animate__fadeIn"
          />
          <Image
            src={product.imgs[1].link}
            height={0}
            alt="Product"
            width={0}
            sizes="100%"
            style={{ width: "100%", height: "auto", aspectRatio: "1/1" }}
            className="d-none second-img animate__animated animate__fadeIn"
          />
          <div className="text-center d-flex flex-column gap-2">
            <RatingCom reviews={product.reviews} />
            <CartButton
              quantity={1}
              selectedVariant={product.variations.lists[0]}
              display="none"
              product={product}
            />
            <span className="fs-4">{product.name}</span>
            {
              <div className="d-flex gap-3 justify-content-center my-4">
                <del>
                  {formatCurrency(
                    product.variations.attributeName
                      ? product.variations.lists[0].price
                      : product.price
                  )}
                </del>
                <strong>
                  {formatCurrency(
                    product.variations.attributeName
                      ? product.variations.lists[0].discountedPrice
                      : product.discountedPrice
                  )}
                </strong>
              </div>
            }
          </div>
        </div>
      </Link>
      <ProductPreview
        selectedVariant={product.variations.lists[0]}
        product={product}
      />
    </>
  );
}
