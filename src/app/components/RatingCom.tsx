import { ReviewType } from "./LatestProd";

export default function RatingCom({ reviews }: { reviews: ReviewType[] }) {
  const sumOfRating = reviews.reduce((prev, review) => {
    return prev + review.rating;
  }, 0);

  const rating = (sumOfRating * 5) / (reviews.length * 5);

  return (
    <div className="d-flex justify-content-center gap-1 my-3">
      {[...Array(5)].map((star, index) => {
        console.log(star);

        index += 1;
        return (
          <button
            key={index}
            type="button"
            className={
              index <= rating
                ? "text-warning btn p-0"
                : "text-secondary btn p-0"
            }
          >
            <span className="star fs-4">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}
