"use client";

import { FormEvent, useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import usePostReq from "../hooks/usePostReq";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";

export default function ContactUs() {
  const subjectRef = useRef<HTMLSelectElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const attachmentRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const { execute, loading } = usePostReq("/contact-us");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const subject = subjectRef.current?.value;
    const email = emailRef.current?.value;
    const attachment = attachmentRef.current?.files?.[0];
    const message = messageRef.current?.value;

    try {
      const formData = new FormData();
      formData.append("subject", subject || "");
      formData.append("email", email || "");
      if (attachment) {
        formData.append("attachment", attachment);
      }
      formData.append("message", message || "");

      const res = await execute(formData);

      if (res.success) {
        return toast.success("Message send!", {
          position: "top-right",
        });
      }

      return toast.error(res.message, {
        position: "top-right",
      });
    } catch (err: any) {
      console.log(err);

      return toast.error(err.message, {
        position: "top-right",
      });
    }
  }

  return (
    <>
      <Header /* loading={brandLoading} brands={brands} */ />
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
          &nbsp; - &nbsp; Contact Us
        </span>
      </div>
      <div className="container d-md-flex my-5 gap-5">
        <div className="d-flex flex-column gap-3 w-100 mt-3">
          <strong className="text-uppercase">store information</strong>
          <div className="border-bottom pb-2 d-flex gap-3 align-items-center">
            <i className="bi bi-geo-alt-fill" />
            <div className="d-flex flex-column gap-1">
              <span>Smart Store</span>
              <span>India</span>
            </div>
          </div>
          <div className="border-bottom pb-2 d-flex gap-3 align-items-center">
            <i className="bi bi-telephone-fill" />
            <div className="d-flex flex-column gap-1">
              <span>Call us:</span>
              <span>+91 9632587530</span>
            </div>
          </div>
          <div className="border-bottom pb-2 d-flex gap-3 align-items-center">
            <i className="bi bi-envelope-fill" />
            <div className="d-flex flex-column gap-1">
              <span>Email us:</span>
              <span>test@test.com</span>
            </div>
          </div>
        </div>
        <div className="p-4 border border-2-light w-100 mt-3">
          <strong className="text-uppercase">contact us</strong>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="d-flex flex-column gap-4 my-3"
          >
            <div className="d-md-flex gap-5  justify-content-between">
              <label htmlFor="subject">Subject</label>
              <select ref={subjectRef} className="form-select" id="subject">
                <option value="query">Query</option>
                <option value="customer-service">Customer Service</option>
              </select>
            </div>
            <div className="d-md-flex gap-5  justify-content-between">
              <label htmlFor="email">Email</label>
              <input
                ref={emailRef}
                placeholder="your@email.com"
                type="email"
                className="form-control"
                id="email"
              />
            </div>
            <div className="d-md-flex gap-5 justify-content-between">
              <label htmlFor="attachment">Attachment</label>
              <input
                ref={attachmentRef}
                type="file"
                className="form-control"
                id="attachment"
              />
            </div>
            <div className="d-md-flex gap-5  justify-content-between">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                ref={messageRef}
                cols={30}
                rows={3}
                className="form-control"
                placeholder="How can we help?"
              />
            </div>
            <div className="ms-auto">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-danger px-4 rounded-pill"
              >
                {loading ? "loading..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </>
  );
}
