import { ProductType } from "@/app/components/LatestProd";
import { useState, useEffect } from "react";

export default function ProductReview({
  product,
  setProdcutReviews,
}: {
  product: ProductType;
  setProdcutReviews: Function;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    setProdcutReviews((prev: any) => {
      if (prev.some((p: any) => p.id === product._id)) {
        return prev.map((p: any) =>
          p.id === product._id
            ? {
                id: product._id,
                productId: product.id,
                title,
                review,
                rating,
              }
            : p
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          id: product._id,
          title,
          review,
          rating,
        },
      ];
    });
  }, [title, rating, review]);

  return (
    <div className="py-4 border-bottom">
      <div className="d-md-flex mt-3 justify-content-between">
        <div className="d-flex gap-4">
          <img src={product.img} alt="Product" width="70px" height="70px" />
          <div className="d-flex flex-column gap-3">
            <strong>{product.name}</strong>
          </div>
        </div>
        <div className="mt-3">
          <strong>Quality: </strong>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              console.log(star);

              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={
                    index <= (hover || rating)
                      ? "text-warning btn p-0"
                      : "text-secondary btn p-0"
                  }
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span className="star fs-4">&#9733;</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <form className="d-flex flex-column my-4 gap-4">
        <div className="d-flex flex-column gap-2">
          <label htmlFor="title" className="fw-bold">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="text"
            className="form-control w-100"
          />
        </div>
        <div className="d-flex flex-column gap-2">
          <label className="fw-bold" htmlFor="review">
            Review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            id="review"
            rows={5}
            className="form-control w-100"
          />
        </div>
      </form>
    </div>
  );
}
