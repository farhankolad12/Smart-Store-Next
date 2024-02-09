"use client";

import useGetReq from "@/app/hooks/useGetReq";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import OrderDetailSkeleton from "./components/OrderDetailSkeleton";
import WriteReview from "./components/WriteReview";
import { OrderStatus } from "@/app/orders/components/OrdersPage";
import OrderStatusRow from "./components/OrderStatusRow";
import { ProductType } from "@/app/components/LatestProd";
import OrderProductRow from "./components/OrderProductRow";
import { formatCurrency } from "@/app/utils/formatCurrency";
import MessageForm from "./components/MessageForm";
import ReviewModal from "./components/ReviewModal";
import withAuth from "@/app/utils/PrivateRoutes";

const OrderDetail = () => {
  const [isReview, setIsReview] = useState(false);

  const { id } = useParams();
  const navigate = useRouter();

  const { error, loading, userData: order } = useGetReq("/user-order", { id });

  if (error) {
    navigate.push("/");
  }

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          background: "url('/assets/banner.jpg') no-repeat top",
          backgroundAttachment: "fixed",
          padding: "70px 15px",
        }}
      >
        <span className="fw-bold">
          <Link style={{ color: "#000" }} href="/">
            Home
          </Link>{" "}
          &nbsp; - &nbsp;{" "}
          <Link href="/orders" className="text-dark">
            Orders
          </Link>{" "}
          &nbsp; - &nbsp;
          <strong>{id}</strong>
        </span>
      </div>
      {loading ? (
        <OrderDetailSkeleton />
      ) : order ? (
        <>
          <main className="container">
            <h3 className="text-center fw-bold my-4">Order details</h3>
            <div className="border p-4 d-flex flex-column gap-3">
              <div className="border p-3">
                <strong>
                  Order Reference {id} - placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </strong>
              </div>
              <div className="border p-3">
                <strong>FOLLOW YOUR ORDER'S STATUS STEP-BY-STEP</strong>
                <div className="table-responsive my-3">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.status.map((st: OrderStatus) => {
                        return <OrderStatusRow key={st.name} st={st} />;
                      })}
                    </tbody>
                  </table>
                </div>
                {!isReview && (
                  <WriteReview setIsReview={setIsReview} order={order} />
                )}
              </div>
              <div className="border p-3 d-flex flex-column gap-2">
                <strong className="fs-5">Delivery address</strong>
                <span>{order.name}</span>
                <span>{order.address.line1}</span>
                <span>{order.address.line2}</span>
                <span>
                  {order.address.city}, {order.address.state}{" "}
                  {order.address.postal_code}
                </span>
                <span>{order.address.country}</span>
                <span>{order.phone}</span>
              </div>
              <div className="border p-3">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit price</th>
                        <th>Total price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((product: ProductType) => {
                        return (
                          <OrderProductRow
                            key={product._id}
                            product={product}
                          />
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="text-end" colSpan={3}>
                          Subtotal
                        </td>
                        <td className="text-end" colSpan={3}>
                          {formatCurrency(order.subtotal)}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-end" colSpan={3}>
                          Shipping
                        </td>
                        <td className="text-end">
                          {formatCurrency(order.shippingPrice)}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-end" colSpan={3}>
                          Total
                        </td>
                        <td className="text-end">
                          {formatCurrency(order.totalPrice)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="p-3 border">
                <h3 className="mb-3 fw-bold fs-5">Add a message</h3>
                <span>
                  If you would like to add a comment about your order, please
                  write it in the field below.
                </span>
                <MessageForm order={order} />
              </div>
            </div>
          </main>
          {order.status.some((st: OrderStatus) => st.name === "Completed") && (
            <ReviewModal setIsReview={setIsReview} order={order} />
          )}
        </>
      ) : (
        "No Order"
      )}
    </>
  );
};

export default withAuth(OrderDetail);
