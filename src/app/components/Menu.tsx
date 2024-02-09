import Link from "next/link";
import useGetReq from "../hooks/useGetReq";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Menu() {
  /*   const { error, loading, userData: categories } = useGetReq("/categories", {}); */

  /*   if (error) {
    toast.error(error, {
      position: "top-right",
    });
  } */

  const { filtersLoading: loading, filters } = useAuth();

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex={-1}
      id="menu"
      aria-labelledby="menuLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="menuLabel"></h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul style={{ listStyle: "none", padding: "0" }}>
          <li className="d-flex justify-content-between align-items-center border-bottom py-2">
            <Link className="text-dark" href="/shop">
              Watch
            </Link>
            <button
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#watch-collection"
              aria-expanded="false"
              aria-controls="watch-collection"
              className="btn p-0"
            >
              <i className="bi bi-chevron-down fs-5" />
            </button>
          </li>
          <div className="collapse" id="watch-collection">
            <div className="d-flex flex-column gap-3 my-3">
              {loading
                ? "loading..."
                : filters.categories?.map((cat: { name: string }) => {
                    return (
                      <Link
                        key={cat.name}
                        className="text-dark"
                        href={`/shop?collections=${cat.name
                          .split(" ")[0]
                          .toLowerCase()}`}
                      >
                        -- {cat.name}
                      </Link>
                    );
                  })}
            </div>
          </div>
          <li className="py-2 border-bottom">
            <Link className="text-dark" href="/shop">
              Shop
            </Link>
          </li>
          <li className="py-2 border-bottom">
            <Link className="text-dark" href="/about">
              About Us
            </Link>
          </li>
          <li className="py-2 border-bottom">
            <Link className="text-dark" href="/privacy-policy">
              Privacy Policy
            </Link>
          </li>
          <li className="py-2 border-bottom">
            <Link className="text-dark" href="/terms-condition">
              Terms & Condition
            </Link>
          </li>
          <li className="py-2 border-bottom">
            <Link className="text-dark" href="/refund-policy">
              Refund Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
