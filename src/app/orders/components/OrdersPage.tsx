import Link from "next/link";
import { toast } from "react-toastify";
import { ProductType } from "../../components/LatestProd";
import useGetReq from "../../hooks/useGetReq";
import OrderRow from "./OrderRow";
import OrderRowSkeleton from "./OrderRowSkeleton";

export type OrderStatus = {
  changedAt: number;
  name: string;
  message: string;
};

export type Order = {
  _id: string;
  createdAt: string;
  totalPrice: number;
  status: OrderStatus[];
  shippingPrice: number;
  message: string;
  products: ProductType[];
};

export default function OrdersPage() {
  const { error, loading, userData: orders } = useGetReq("/user-orders", {});

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
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
          &nbsp; - &nbsp; <span className="text-dark">Orders</span>
        </span>
      </div>
      <main className="container">
        <h3 className="fw-bold text-center my-4">Your Orders</h3>
        <div className="border p-4">
          <strong className="mb-3">
            Here are the orders you&apos;ve placed since your account was
            created.
          </strong>
          {loading ? (
            <div className="table-responsive mt-4">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Invoice</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  <OrderRowSkeleton />
                  <OrderRowSkeleton />
                  <OrderRowSkeleton />
                </tbody>
              </table>
            </div>
          ) : orders.length ? (
            <div className="table-responsive mt-4">
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Invoice</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: Order) => {
                    return <OrderRow key={order._id} order={order} />;
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <h3 className="text-center fw-bold my-4">No Orders</h3>
          )}
        </div>
      </main>
    </>
  );
}
