import Image from "next/image";

export default function Carousel() {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image
            src="https://fabulous-ishi.myshopify.com/cdn/shop/files/watch1.png?v=1615320735"
            className="d-block w-100"
            alt="Watch 1"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="carousel-item">
          <Image
            src="https://fabulous-ishi.myshopify.com/cdn/shop/files/watch2.png?v=1615320735"
            className="d-block w-100"
            alt="Watch 2"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
