import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";
import { toast } from "react-toastify";
import { ProductType } from "./LatestProd";
import CartRow from "./CartRow";

export default function CartCanvas() {
  const [subTotal, setSubTotal] = useState<number>(0);
  const [shippingTotal, setShippingTotal] = useState<number>(0);
  const { currentUser, cartItems, cartLoading: loading, error } = useAuth();

  const router = useRouter();

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
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
        ? cartItems.reduce((prev: number, current: any) => {
            return current.shippingConfig.price &&
              prev > current.shippingConfig.price
              ? prev
              : current.shippingConfig.price || prev;
          }, 0)
        : 0
    );
  }, [cartItems]);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="cartCanvas"
      aria-labelledby="cartCanvasLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartCanvasLabel">
          Cart
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {currentUser && !loading ? (
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="d-flex flex-column gap-3">
              {cartItems && cartItems.length ? (
                cartItems.map((item: ProductType) => {
                  return (
                    <CartRow
                      setSubTotal={setSubTotal}
                      setShippingTotal={setShippingTotal}
                      key={
                        item.selectedVariantId
                          ? item.selectedVariantId
                          : item._id
                      }
                      item={item}
                    />
                  );
                })
              ) : (
                <h3 className="text-center my-3">No Items In Cart</h3>
              )}
            </div>
            {!loading && cartItems && cartItems.length ? (
              <div className="d-flex flex-column gap-3 mt-5 mb-3">
                <div className="d-flex justify-content-between">
                  <strong>Subtotal</strong>
                  <span>{formatCurrency(subTotal)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Shipping</strong>
                  <span>{formatCurrency(shippingTotal)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <span>{formatCurrency(subTotal + shippingTotal)}</span>
                </div>
                <button
                  type="button"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={() => router.push("/cart")}
                  className="btn btn-danger m-auto px-5 rounded-pill"
                >
                  Checkout
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="text-center">
            <h3 className="my-4">Please Login</h3>
            <button
              type="button"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => router.push("/login")}
              className="btn btn-danger px-5 rounded-pill"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
