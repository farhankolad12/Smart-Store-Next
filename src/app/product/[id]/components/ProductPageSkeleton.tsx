import ProductSkeleton from "@/app/components/ProductSkeleton";

export default function ProductPageSkeleton() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          background: "url('/assets/banner.avif') no-repeat top",
          backgroundAttachment: "fixed",
          padding: "70px 15px",
        }}
      >
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
      </div>
      <main className="container">
        <div className="d-md-flex gap-5 justify-content-center mb-5">
          <div className="d-flex flex-column gap-4 mt-4 first-div">
            <div>
              <svg
                className="bd-placeholder-img card-img-top"
                width="100%"
                height="180"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#868e96"></rect>
              </svg>
            </div>
            <div className="d-flex gap-2 imgs-slider">
              {[...Array(3)].map(() => {
                return (
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height="180"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                  </svg>
                );
              })}
            </div>
          </div>
          <div className="mt-4 second-div">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <div className="d-flex gap-3 align-items-center">
              <div className="border-end pe-3 mb-3">
                <span className="placeholder col-6"></span>
              </div>
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
            </div>
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <div className="btn p-0 mb-3">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
            </div>
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <div className="d-flex flex-column gap-4">
              <div className="d-flex flex-column gap-1">
                <label htmlFor="quantity" className="fw-bold">
                  <span className="placeholder col-6"></span>
                </label>
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
              </div>
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>
            </div>
            <div className="card card-body mt-5">
              <div className="d-flex flex-column gap-4 ">
                <div className="d-flex flex-column justify-content-between flex-lg-row gap-4">
                  <span className="placeholder placeholder-glow col-6"></span>
                  <span className="placeholder placeholder-glow col-6"></span>
                </div>
                <div className="d-flex flex-column justify-content-between flex-lg-row gap-4">
                  <span className="placeholder placeholder-glow col-6"></span>
                  <span className="placeholder placeholder-glow col-6"></span>
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
          <div className="tab-content w-100" id="pills-tabContent">
            <div
              className="tab-pane fade show active w-100"
              id="description"
              role="tabpanel"
              aria-labelledby="description-tab"
              tabIndex={0}
            >
              <div className="border p-5 w-100">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-12 "></span>
                </h5>
              </div>
            </div>
            <div
              className="tab-pane fade w-100"
              id="details"
              role="tabpanel"
              aria-labelledby="details-tab"
              tabIndex={0}
            >
              <div className="p-5 w-100 text-center">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-12 "></span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <div className="border d-flex align-items-center justify-content-between bg-light p-3">
            <div className="d-flex align-items-center gap-1">
              <i className="bi bi-chat-left-text-fill fs-4" />
              <span>Comments</span>
              <span className="placeholder col-6"></span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span>Grade</span>
            </div>
          </div>
          <div className="border p-4 d-flex flex-column gap-5">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-12"></span>
            </h5>
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
              {[...Array(3)].map(() => {
                return <ProductSkeleton />;
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
