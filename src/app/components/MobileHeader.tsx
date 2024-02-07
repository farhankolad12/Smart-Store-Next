import { useRouter } from "next/navigation";
// import Logo from "../Home/Logo";
import Menu from "./Menu";
import CartCanvas from "./CartCanvas";
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

export default function MobileHeader() {
  const navigate = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const { cartItems } = useAuth();

  return (
    <>
      <div className="py-3 container mobile-header">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#menu"
            aria-controls="menu"
            className="btn p-0"
          >
            <i className="bi bi-list fs-5" />
          </button>
          <button
            data-bs-toggle="collapse"
            data-bs-target="#search-icon"
            aria-expanded="false"
            aria-controls="search-icon"
            className="btn p-0 border-none"
          >
            <i className="bi bi-search fs-5" />
          </button>
          <div className="collapse collapse-horizontal" id="search-icon">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = searchRef.current?.value;
                if (q) navigate.push(`/shop?q=${q}`);
              }}
            >
              <input
                ref={searchRef}
                placeholder="Enter..."
                type="text"
                className="form-control"
              />
            </form>
          </div>
        </div>
        <div>
          <Logo />
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            onClick={() => navigate.push("/login")}
            className="btn p-0 border-none"
          >
            <i className="bi bi-person fs-5" />
          </button>
          <button
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartCanvas"
            aria-controls="cartCanvas"
            className="btn p-0 border-none"
          >
            <i className="bi bi-cart fs-5" />
            {cartItems && cartItems.length && (
              <span
                className="position-absolute bg-danger text-light rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  fontSize: ".7rem",
                  width: "15px",
                  height: "15px",
                  top: "5.4rem",
                  right: ".8rem",
                }}
              >
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
      <Menu />
      <CartCanvas />
    </>
  );
}
