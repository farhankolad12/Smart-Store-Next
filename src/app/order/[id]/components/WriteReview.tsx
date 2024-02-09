import { Order, OrderStatus } from "../../../orders/components/OrdersPage";
import { toast } from "react-toastify";
import useGetReq from "../../../hooks/useGetReq";

export default function WriteReview({
  order,
  setIsReview,
}: {
  order: Order;
  setIsReview: Function;
}) {
  const {
    error,
    loading,
    userData: alreadyReviewed,
  } = useGetReq("/check-review", { orderId: order._id });

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
  }

  if (!loading) {
    setIsReview(alreadyReviewed.success);
  }

  return order.status.some((st: OrderStatus) => st.name === "Completed") &&
    !loading &&
    alreadyReviewed.success === null ? (
    <div className="my-3 text-center">
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#reviewModal"
        className="btn btn-success px-5 rounded-pill"
      >
        Write a review
      </button>
    </div>
  ) : (
    ""
  );
}
