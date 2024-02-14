import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import usePostReq from "../../hooks/usePostReq";

export default function IdentityPage() {
  const { currentUser, setCurrentUser } = useAuth();

  const [title, setTitle] = useState(currentUser?.title);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const oldPassRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);

  const { execute, loading } = usePostReq("/update-details");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const oldPass = oldPassRef.current?.value;
    const newPass = newPassRef.current?.value;

    if ((oldPass && newPass === "") || (oldPass === "" && newPass)) {
      return toast.error("Old password & new password is required!", {
        position: "top-right",
      });
    }

    try {
      const res = await execute({
        title,
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        email: emailRef.current?.value,
        oldPass,
        newPass,
        birthDate: birthDateRef.current?.value,
      });

      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }
      setCurrentUser(res.user);
      toast.success("Changes saved!", {
        position: "top-right",
      });
    } catch (err: any) {
      return toast.error(err.message, {
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
          &nbsp; - &nbsp;{" "}
          <Link className="text-dark" href="/account">
            Your Account
          </Link>{" "}
          &nbsp; - &nbsp; Your Personal Information
        </span>
      </div>
      <div className="my-5 d-flex flex-column justify-content-center align-items-center container">
        <h3 className="fw-bold mb-4 text-center">Your Personal Information</h3>
        <div
          style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
          className="auth-container"
        >
          <form
            onSubmit={handleSubmit}
            className="d-flex p-5 flex-column gap-3 border-bottom py-3"
          >
            <div className="d-md-flex gap-5 align-items-center">
              <label htmlFor="social-title">Social title</label>
              <div
                onChange={(e: any) => setTitle(e.target.value)}
                className="d-flex gap-1"
              >
                <input
                  type="radio"
                  name="social-title"
                  id="mr"
                  value="mr"
                  defaultChecked={title === "mr" ? true : false}
                />
                <label htmlFor="mr">Mr. </label>

                <input
                  type="radio"
                  name="social-title"
                  id="mrs"
                  value="mrs"
                  defaultChecked={title === "mrs" ? true : false}
                />
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
                defaultValue={currentUser?.firstName}
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
                defaultValue={currentUser?.lastName}
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
                defaultValue={currentUser?.email}
                required
              />
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label className="w-100" htmlFor="password">
                Old Password
              </label>
              <input
                ref={oldPassRef}
                type="password"
                id="password"
                className="form-control"
              />
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label className="w-100" htmlFor="con-password">
                New Password
              </label>
              <input
                ref={newPassRef}
                type="password"
                id="con-password"
                className="form-control"
              />
            </div>
            <div className="d-md-flex gap-5 align-items-center">
              <label className="w-100" htmlFor="birth-date">
                Birth Date
              </label>
              <input
                defaultValue={currentUser?.birthDate}
                ref={birthDateRef}
                type="date"
                id="birth-date"
              />
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
