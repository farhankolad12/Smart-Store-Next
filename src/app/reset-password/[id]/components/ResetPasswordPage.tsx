import { FormEvent, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import usePostReq from "../../../hooks/usePostReq";
import { toast } from "react-toastify";

export default function ResetPassword({ id }: { id: string | undefined }) {
  const searchParams = useSearchParams();

  const router = useRouter();
  const passRef = useRef<HTMLInputElement>(null);
  const conPassRef = useRef<HTMLInputElement>(null);

  const { execute, loading } = usePostReq("/reset-password");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      if (passRef.current?.value !== conPassRef.current?.value) {
        return toast.error("Password don't match", {
          position: "top-right",
        });
      }
      const res = await execute({
        token: id,
        password: passRef.current?.value,
      });

      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }

      toast.success("Password changed!", {
        position: "top-right",
      });

      router.push("/login");
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
          background: "url('/assets/banner.jpg') no-repeat top",
          backgroundAttachment: "fixed",
          padding: "70px 15px",
        }}
      >
        <span className="fw-bold">
          <Link style={{ color: "#000" }} href="/">
            Home
          </Link>{" "}
          &nbsp; - &nbsp; Reset Password
        </span>
      </div>
      <div className="my-5 d-flex flex-column justify-content-center align-items-center container">
        <h3 className="fw-bold mb-4 text-center">Reset your account</h3>
        <div
          style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
          className="auth-container"
        >
          <form
            onSubmit={handleSubmit}
            className="d-flex p-5 flex-column gap-3 border-bottom py-3"
          >
            <div className="d-md-flex gap-5 align-items-center">
              <label htmlFor="password">new password</label>
              <input
                ref={passRef}
                type="password"
                id="new-password"
                className="form-control"
              />
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label htmlFor="con-password">confirm password</label>
              <input
                ref={conPassRef}
                type="password"
                id="con-password"
                className="form-control"
              />
            </div>
            <button
              disabled={loading}
              className="btn btn-danger px-4 fw-bold text-uppercase"
            >
              {loading ? "loading..." : "set"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
