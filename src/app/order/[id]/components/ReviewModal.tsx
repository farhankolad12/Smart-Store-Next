import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Order } from "@/app/orders/components/OrdersPage";
import usePostReq from "@/app/hooks/usePostReq";
import ProductReview from "./ProductReview";

export default function ReviewModal({
  order,
  setIsReview,
}: {
  order: Order;
  setIsReview: Function;
}) {
  const [prodcutReviews, setProdcutReviews] = useState([]);

  const { execute, loading } = usePostReq("/add-review");

  const navigate = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({
        productReviews: prodcutReviews,
        id: order._id,
      });

      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }

      setIsReview(true);

      navigate.push("/");

      toast.success("Reviews Added!", {
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
      id="reviewModal"
      tabIndex={-1}
      aria-labelledby="reviewModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" style={{ maxWidth: "800px" }}>
        <div className="modal-content ">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="reviewModalLabel">
              Write a review
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {order.products.map((product) => {
              return (
                <ProductReview
                  setProdcutReviews={setProdcutReviews}
                  key={product.id}
                  product={product}
                />
              );
            })}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-dark px-4 rounded-pill"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleSubmit}
              type="button"
              className="btn btn-danger px-4 rounded-pill"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
