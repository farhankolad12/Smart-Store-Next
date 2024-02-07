import Image from "next/image";

export default function Community() {
  return (
    <section className="container d-flex flex-column-reverse flex-lg-row gap-5 align-items-center justify-content-center my-5 w-100">
      <div className="d-flex flex-column gap-4 w-100 text-secondary">
        <h1 className="fw-bold text-center">Join the Smart Store Community</h1>
        <p>
          <b>Smart Store Watches</b> is not just a shop; it's a community of
          watch enthusiasts. Follow us on social media, join our newsletter, and
          be the first to know about new arrivals, promotions, and exclusive
          offers. Let's share the excitement of timekeeping together.
        </p>
        <span>
          Thank you for choosing Smart Store Watches—where smart choices meet
          timeless elegance.
        </span>
        <div className="d-flex gap-2 align-items-center">
          <a
            href="https://www.instagram.com/smart_store_2022_1/"
            target="_blank"
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="bg-danger rounded-circle"
          >
            <i className="bi bi-instagram fs-4 text-light" />
          </a>
          <a
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            href="https://www.facebook.com/"
            target="_blank"
            className="bg-primary rounded-circle"
          >
            <i className="bi bi-facebook fs-4 text-light" />
          </a>
        </div>
      </div>
      <Image
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
        src="/assets/about2.jpg"
        alt="About"
      />
    </section>
  );
}
