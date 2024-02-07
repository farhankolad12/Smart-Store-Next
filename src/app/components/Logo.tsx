import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="text-dark">
      <img src="/favicon.jpeg" alt="Logo" width="80px" />
    </Link>
  );
}
