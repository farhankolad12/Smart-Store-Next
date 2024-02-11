import Link from "next/link";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <header>
      <div className="bg-dark py-3 d-flex align-items-center justify-content-center">
        <Link href="/wishlist" className="text-light border-end pe-3 fw-bold">
          Wishlist
        </Link>
        <Link href="/contact" className="text-light ps-3 fw-bold">
          Contact
        </Link>
      </div>
      <>
        <MobileHeader />
        <DesktopHeader /* brands={brands}  */ />
      </>
    </header>
  );
}
