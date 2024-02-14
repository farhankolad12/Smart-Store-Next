import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import usePostReq from "../hooks/usePostReq";
import { useAuth } from "../context/AuthContext";

export default function AccountPage() {
  const { execute, loading } = usePostReq("/logout");
  const { setCurrentUser, setCartItems } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    try {
      const res = await execute({});
      if (!res.success) {
        return toast.error(res.message, { position: "top-right" });
      }
      setCurrentUser(undefined);
      setCartItems([]);

      router.push("/");
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
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
          &nbsp; - &nbsp; Your account
        </span>
      </div>
      <div className="container my-4">
        <h3 className="text-center fw-bold">Your Account</h3>
        <div className="border rounded p-3 d-flex gap-4">
          <Link
            href="/identity"
            className="py-5 w-100 text-dark bg-light d-flex flex-column text-center"
          >
            <i className="bi bi-person-fill fs-1" />
            <span>Information</span>
          </Link>
          <Link
            href="/address"
            className="py-5 w-100 text-dark bg-light d-flex flex-column text-center"
          >
            <i className="bi bi-geo-alt-fill fs-1" />
            <span>Address</span>
          </Link>
          <Link
            href="/orders"
            className="py-5 w-100 text-dark bg-light d-flex flex-column text-center"
          >
            <i className="bi bi-calendar3 fs-1" />
            <span>Orders</span>
          </Link>
        </div>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="btn btn-danger rounded-pill px-4 m-auto d-flex my-5"
        >
          {loading ? "loading..." : "Sign out"}
        </button>
      </div>
    </>
  );
}
