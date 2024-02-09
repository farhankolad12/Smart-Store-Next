import OrderRowSkeleton from "../../../orders/components/OrderRowSkeleton";

export default function OrderDetailSkeleton() {
  return (
    <main className="container">
      <h3 className="text-center fw-bold my-4">Order details</h3>
      <div className="border p-4 d-flex flex-column gap-3">
        <div className="border p-3">
          <strong>Order Reference - placed on </strong>
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
                <OrderRowSkeleton />
                <OrderRowSkeleton />
                <OrderRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
        <div className="border p-3 d-flex flex-column gap-2">
          <strong className="fs-5">Delivery address</strong>
          <h5 className="placeholder-glow">
            <span className="placeholder col-5"></span>
          </h5>
          <h5 className="placeholder-glow">
            <span className="placeholder col-5"></span>
          </h5>
          <h5 className="placeholder-glow">
            <span className="placeholder col-5"></span>
          </h5>
          <h5 className="placeholder-glow">
            <span className="placeholder col-5"></span>
          </h5>
          <h5 className="placeholder-glow">
            <span className="placeholder col-5"></span>
          </h5>
          <h5 className="placeholder-glow">
            <span className="placeholder col-5"></span>
          </h5>
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
                <OrderRowSkeleton />
                <OrderRowSkeleton />
                <OrderRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-3 border">
          <h3 className="mb-3 fw-bold fs-5">Add a message</h3>
          <span>
            If you would like to add a comment about your order, please write it
            in the field below.
          </span>
        </div>
      </div>
    </main>
  );
}
