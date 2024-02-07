import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container my-5 d-flex flex-column align-items-center justify-content-center">
      <h2 style={{ fontSize: "10rem" }} className="fw-bold">
        404{" "}
      </h2>
      <span>Page Not Found</span>
      <Link href="/" className="btn btn-outline-secondary px-5 mt-4">
        Go Home
      </Link>
    </main>
  );
}
