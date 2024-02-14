import { useAuth } from "@/app/context/AuthContext";
import usePostReq from "@/app/hooks/usePostReq";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { execute, loading } = usePostReq("/login");
  const { setCurrentUser, currentUser, setCartItems } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      if (!res.success) {
        toast.error(res.message, {
          position: "top-right",
        });
      }
      setCurrentUser(res.user);
      setCartItems(res.cartItems);
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    currentUser && router.replace("/account");
  }, [currentUser]);

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
          &nbsp; - &nbsp; Login
        </span>
      </div>
      <div className="my-5 d-flex flex-column justify-content-center align-items-center container">
        <h3 className="fw-bold mb-4 text-center">Log in to your account</h3>
        <div
          style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
          className="auth-container"
        >
          <form
            onSubmit={handleSubmit}
            className="d-flex p-5 flex-column gap-3 border-bottom py-3"
          >
            <div className="d-md-flex gap-5 align-items-center">
              <label htmlFor="email">Email</label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                className="form-control"
              />
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label htmlFor="password">Password</label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                className="form-control"
              />
            </div>
            <Link href="/forget-password" className="text-center text-danger">
              Forget your password?
            </Link>
            <button
              disabled={loading}
              className="btn btn-danger px-4 fw-bold text-uppercase"
            >
              {loading ? "loading..." : "sign in"}
            </button>
          </form>
          <div className="text-center m-auto my-3">
            No account? Create one <Link href="/signup">here</Link>
          </div>
        </div>
      </div>
    </>
  );
}
