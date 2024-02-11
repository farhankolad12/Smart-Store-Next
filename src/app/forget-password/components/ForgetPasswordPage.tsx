import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import usePostReq from "../../hooks/usePostReq";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [success, setSuccess] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const { execute, loading } = usePostReq("/forget-password");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const res = await execute({ email: emailRef.current?.value });

      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }

      setSuccess(true);
    } catch (err: any) {
      toast.error(err, {
        position: "top-right",
      });
    }
  }

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          background: "url(&apos;/assets/banner.jpg&apos;) no-repeat top",
          backgroundAttachment: "fixed",
          padding: "70px 15px",
        }}
      >
        <span className="fw-bold">
          <Link style={{ color: "#000" }} href="/">
            Home
          </Link>{" "}
          &nbsp; - &nbsp; Forget Password
        </span>
      </div>
      <div className="my-5 d-flex flex-column justify-content-center align-items-center container">
        <h3 className="fw-bold mb-4 text-center">Reset your account</h3>
        <div
          style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
          className="auth-container"
        >
          {success && (
            <div className="bg-success p-5">
              <span>
                If your account is associated with {emailRef.current?.value}{" "}
                mail, then you will recieve a link for reset password
              </span>
            </div>
          )}
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
                required
              />
            </div>
            <Link href="/login" className="text-center text-danger">
              Login to your account
            </Link>
            <button
              disabled={loading}
              className="btn btn-danger px-4 fw-bold text-uppercase"
            >
              {loading ? "loading..." : "send"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
