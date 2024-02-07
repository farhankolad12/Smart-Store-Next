import "./globals.css";

export default function loading() {
  return (
    <main className="page-loading">
      <div
        style={{ width: "100px", height: "100px" }}
        className="spinner-border text-light"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </main>
  );
}
