import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="bg-dark">
        <div className="footer container d-flex flex-lg-row flex-column gap-5 justify-content-between py-4">
          <div className="first d-flex flex-column gap-2 text-center">
            <Link href="/" className="text-light">
              <h3>Logo</h3>
            </Link>
            <span className="text-light">
              Welcome to Smart Store Watches, your go-to destination for a
              curated collection of timepieces that seamlessly blend style,
              innovation, and affordability. Established with a passion for
              watches of all kinds, Smart Store is more than a shop. it&apos;s
              an experience where every tick tells a story.
            </span>
            <div className="d-flex gap-2 align-items-center justify-content-center">
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
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="bg-primary rounded-circle"
              >
                <i className="bi bi-facebook fs-4 text-light" />
              </div>
            </div>
          </div>
          <div className="text-light d-flex flex-column mt-3">
            <span className="fs-5 fw-bold mb-2">Your account</span>
            <div className="d-flex flex-column gap-2 ">
              <Link href="/account" className="text-light">
                Personal Info
              </Link>
              <Link href="/orders" className="text-light">
                Orders
              </Link>
              <Link href="/address" className="text-light">
                Addresses
              </Link>
            </div>
          </div>
          <div className="text-light d-flex flex-column mt-3">
            <span className="fs-5 fw-bold mb-2">Our Company</span>
            <div className="d-flex flex-column gap-2 ">
              <Link href="/contact" className="text-light">
                Contact Us
              </Link>
              <Link href="/shop" className="text-light">
                Our Store
              </Link>
              <Link href="/privacy-policy" className="text-light">
                Privacy Policy
              </Link>
              <Link href="/terms-services" className="text-light">
                Terms & Conditions
              </Link>
              <Link href="/refund-policy" className="text-light">
                Refund Policy
              </Link>
            </div>
          </div>
          <div className="d-flex flex-column gap-4 text-light mt-3">
            <span className="fs-5 fw-bold">Store Information</span>
            <div className="d-flex align-items-center gap-3">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="bg-danger rounded-circle"
              >
                <i className="bi bi-telephone-fill fs-5" />
              </div>
              <div className="d-flex flex-column gap-1">
                <strong>Contact Us</strong>
                <span>+91 098827 86766</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="bg-danger rounded-circle "
              >
                <i className="bi bi-envelope-fill fs-5" />
              </div>
              <div className="d-flex flex-column gap-1">
                <strong>Email</strong>
                <span>smart-store2024@gmail.com</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="bg-danger rounded-circle"
              >
                <i className="bi bi-geo-alt-fill fs-5" />
              </div>
              <div className="d-flex flex-column gap-1">
                <strong>Location</strong>
                <span>
                  Masjid
                  <br />
                  JAIL ZAPA
                  <br />
                  near Jail Road
                  <br />
                  Gujarat Mangrol 362225
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#000" }}>
        <div className="container py-3">
          <span className="text-light">© 2023 - Smart Watch Store™</span>
        </div>
      </div>
    </>
  );
}
