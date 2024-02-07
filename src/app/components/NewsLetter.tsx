import { FormEvent, useRef } from "react";
import usePostReq from "../hooks/usePostReq";
import { Bounce, toast } from "react-toastify";

export default function NewsLetter() {
  const { execute, loading } = usePostReq("/newsletter-subscription");

  const emailRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value;

    try {
      if (email !== "") {
        const res = await execute({ email });

        if (res.success) {
          return toast.success(res.message, {
            position: "top-right",
            autoClose: 4999,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        }
      }
      return toast.error("Email should not be empty!", {
        position: "top-right",
        autoClose: 4999,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } catch (err: any) {
      return toast.error(err.message, {
        position: "top-right",
        autoClose: 4999,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }

  return (
    <div className="bg-danger py-4 mt-5">
      <div className="text-center container d-sm-flex justify-content-between gap-2">
        <div className="d-sm-flex align-items-center gap-4 w-100">
          <i className="bi bi-envelope-paper fs-1 text-light" />
          <div className="d-flex flex-column gap-1">
            <h3 className="fw-bold text-light">Join Our Newsletter</h3>
            <span className="text-light">
              Enter your email address and receive news.
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center position-relative w-100 "
        >
          <input
            style={{ border: "none", outline: "none", borderRadius: "30px" }}
            type="email"
            className="px-4 py-3 w-100"
            placeholder="Your email address"
            ref={emailRef}
          />
          <button
            disabled={loading}
            style={{ borderRadius: "30px" }}
            className="btn btn-dark py-3 px-3 position-absolute end-0"
          >
            {loading ? "..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
