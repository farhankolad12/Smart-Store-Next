import { FormEvent, useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import usePostReq from "../../hooks/usePostReq";

export default function Signup() {
  const [title, setTitle] = useState("");

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);

  const { execute, loading } = usePostReq("/signup");
  const { setCurrentUser, currentUser, setCartItems } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (title === "") {
      return toast.error("Please select your social title!", {
        position: "top-right",
      });
    }

    try {
      const res = await execute({
        title,
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        birthDate: birthDateRef.current?.value,
      });
      if (!res.success) {
        toast.error(res.message, {
          position: "top-right",
        });
      }
      setCartItems(res.cartItems);
      setCurrentUser(res.user);
    } catch {
      toast.error("Something went wrong!", {
        position: "top-right",
      });
    }
  }

  useEffect(() => {
    currentUser && router.push("/account");
  }, [currentUser]);

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
          &nbsp; - &nbsp; Signup
        </span>
      </div>
      <div className="my-5 d-flex flex-column justify-content-center align-items-center container">
        <h3 className="fw-bold mb-4 text-center">Create an account</h3>
        <div
          style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
          className="auth-container"
        >
          <form
            onSubmit={handleSubmit}
            className="d-flex p-5 flex-column gap-3 border-bottom py-3"
          >
            <span>
              Already have an account?{" "}
              <Link className="text-danger" href="/login">
                Log in instead!
              </Link>
            </span>
            <div className="d-md-flex gap-5 align-items-center">
              <label htmlFor="social-title">Social title</label>
              <div
                onChange={(e: any) => setTitle(e.target.value)}
                className="d-flex gap-1"
              >
                <input type="radio" name="social-title" id="mr" value="mr" />
                <label htmlFor="mr">Mr. </label>

                <input type="radio" name="social-title" id="mrs" value="mrs" />
                <label htmlFor="mrs">Mrs. </label>
              </div>
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label htmlFor="first-name" className="w-100">
                First Name
              </label>
              <input
                ref={firstNameRef}
                type="text"
                id="first-name"
                className="form-control w-100"
                required
              />
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label className="w-100" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="form-control"
                ref={lastNameRef}
                required
              />
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label className="w-100" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                className="form-control"
                required
              />
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label className="w-100" htmlFor="password">
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                className="form-control"
                required
              />
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label className="w-100" htmlFor="birth-date">
                Birth Date
              </label>
              <input ref={birthDateRef} type="date" id="birth-date" />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <label htmlFor="terms">
                I Accept <Link href="/terms-services">Terms & Conditons</Link>
              </label>
              <input type="checkbox" id="terms" required />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <label htmlFor="privacy">
                I have read & agree to{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>
              </label>
              <input type="checkbox" id="privacy" required />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <label htmlFor="refund">
                I have read & agree to{" "}
                <Link href="/refund-policy">Refund Policy</Link>
              </label>
              <input type="checkbox" id="refund" required />
            </div>
            <button
              disabled={loading}
              className="btn btn-danger px-4 text-uppercase"
            >
              {loading ? "loading..." : "save"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
