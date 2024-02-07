import "../globals.css";

export default function OurServices() {
  return (
    <div className="container py-5 our-services">
      <div className="text-center header d-flex flex-column gap-2 my-3 py-4 ">
        <span
          style={{ letterSpacing: "2px" }}
          className="text-uppercase text-secondary fs-5"
        >
          smart store
        </span>
        <h2 className="fw-bold fs-1">Our Services</h2>
      </div>
      <div className="services py-5">
        <div className="d-flex flex-column gap-2 text-center w-100">
          <i className="bi bi-bullseye text-secondary  fs-1" />
          <strong className="fs-4 ">Ship in 24 hours</strong>
          <p className="text-secondary">
            Shipping all over India in just 24hrs
          </p>
        </div>
        <div className="d-flex flex-column gap-2 text-center w-100">
          <i className="bi bi-shop text-secondary  fs-1" />
          <strong className="fs-4 ">24 Months Warranty</strong>
          <p className="text-secondary">Warranty for watches upto 2 years</p>
        </div>
        <div className="d-flex flex-column gap-2 text-center w-100">
          <i className="bi bi-arrow-left-right text-secondary  fs-1" />
          <strong className="fs-4 ">7 Days Return</strong>
          <p className="text-secondary">Easy Return & Exchange</p>
        </div>
        <div className="d-flex flex-column gap-2 text-center w-100">
          <i className="bi bi-award  text-secondary fs-1" />
          <strong className="fs-4 ">100% Authenticity</strong>
          <p className="text-secondary">100% Authenticated Watches</p>
        </div>
      </div>
    </div>
  );
}
