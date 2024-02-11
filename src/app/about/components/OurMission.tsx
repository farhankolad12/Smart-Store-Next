export default function OurMission() {
  return (
    <section className="container py-5 our-services">
      <div className="text-center header d-flex flex-column gap-2 my-3 py-4 ">
        <span
          style={{ letterSpacing: "2px" }}
          className="text-uppercase text-secondary fs-5"
        >
          smart store
        </span>
        <h2 className="fw-bold fs-1">Our Mission</h2>
      </div>
      <div className="services py-5">
        <div className="d-flex flex-column gap-2 text-center w-100">
          <i className="bi bi-bullseye text-secondary  fs-1" />
          <strong className="fs-4 ">Timepiece Diversity for Every Wrist</strong>
          <p className="text-secondary">
            At Smart Store, our mission is simple, to offer a diverse range of
            watches that cater to every taste.
          </p>
        </div>
        <div className="d-flex flex-column gap-2 text-center w-100">
          <i className="bi bi-shop text-secondary  fs-1" />
          <strong className="fs-4 ">Hub for Watch Enthusiasts</strong>
          <p className="text-secondary">
            Smart Store Watches is more than a shop, it&apos;s a haven for watch
            enthusiasts.
          </p>
        </div>
        <div className="d-flex flex-column gap-2 text-center w-100">
          <i className="bi bi-arrow-left-right text-secondary  fs-1" />
          <strong className="fs-4 ">Affordable Luxury, Smart Choices</strong>
          <p className="text-secondary">
            We believe that everyone deserves to own a timepiece that reflects
            their individuality.
          </p>
        </div>
      </div>
    </section>
  );
}
