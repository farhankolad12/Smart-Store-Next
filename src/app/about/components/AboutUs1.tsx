import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AboutUs1() {
  const router = useRouter();

  return (
    <section className="container d-flex flex-column flex-lg-row gap-5 align-items-center justify-content-center my-5 w-100">
      <Image
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
        src="/assets/about1.avif"
        alt="About"
      />
      <div className="d-flex flex-column gap-4 w-100 text-secondary">
        <h1 className="fw-bold text-center">We Have Everything You Need</h1>
        <p>
          Welcome to <b>Smart Store Watches</b>, your go-to destination for a
          curated collection of timepieces that seamlessly blend style,
          innovation, and affordability. Established with a passion for watches
          of all kinds, Smart Store is more than a shop. it's an experience
          where every tick tells a story.
        </p>
        <span>
          Whether you're drawn to classic elegance, modern minimalism, or
          cutting-edge technology, we take pride in curating a selection that
          meets the unique preferences of our diverse clientele.
        </span>
        <button
          onClick={() => router.push("/contact")}
          className="btn btn-secondary rounded-pill me-auto px-5 py-2"
        >
          Contact us
          <i className="bi bi-arrow-right ms-2" />
        </button>
      </div>
    </section>
  );
}
