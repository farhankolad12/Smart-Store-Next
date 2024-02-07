import { toast } from "react-toastify";
import useGetReq from "../hooks/useGetReq";
import { ReviewType } from "./LatestProd";
import ProductSkeleton from "./ProductSkeleton";
import Carousel from "nuka-carousel";

export default function CustomerReviews() {
  const {
    error,
    loading,
    userData: testimonials,
  } = useGetReq("/testimonials", {});

  if (error) {
    toast.error(error, {
      position: "top-right",
    });
  }

  return testimonials && testimonials.length ? (
    <div className="bg-light py-5 my-5">
      <div className="container">
        <div className="d-flex flex-column gap-2 header text-center my-3 py-4">
          <span
            style={{ letterSpacing: "2px" }}
            className="text-uppercase text-secondary fs-5"
          >
            smart store
          </span>
          <h2 className="fw-bold fs-1">Customer Reviews</h2>
        </div>
        <div className=" p-5 mx-auto mt-3 mb-3">
          {loading ? (
            <Carousel
              enableKeyboardControls={true}
              pauseOnHover={true}
              renderBottomCenterControls={() => false}
              autoplay={true}
              cellSpacing={5}
              slidesToScroll={1}
              slidesToShow={1}
              wrapAround={true}
            >
              <>
                <ProductSkeleton />
              </>
              <>
                <ProductSkeleton />
              </>
            </Carousel>
          ) : (
            <Carousel
              enableKeyboardControls={true}
              pauseOnHover={true}
              renderBottomCenterControls={() => false}
              autoplay={true}
              cellSpacing={5}
              slidesToScroll={1}
              slidesToShow={1}
              wrapAround={true}
            >
              {testimonials.map((testimonial: ReviewType) => {
                return (
                  <div key={testimonial._id}>
                    <div className="bg-white p-5 pt-1 h-100 d-flex flex-column align-items-center text-center justify-content-between">
                      <img
                        src="/assets/user-profile.avif"
                        width="150px"
                        height="150px"
                        className="rounded-circle"
                        alt="Profile"
                      />
                      <p className="py-2">{testimonial.review}</p>
                      <div className="d-flex flex-column gap-3">
                        <div className="d-flex flex-column flex-lg-row flex gap-2 align-items-center">
                          <strong className="fs-5">
                            {testimonial.firstName + " " + testimonial.lastName}
                          </strong>
                          <span className="text-secondary">
                            {testimonial.title}
                          </span>
                        </div>
                        <div className="d-flex gap-3">
                          {[...Array(5)].map((s, i) => {
                            console.log(s);

                            return (
                              <i
                                key={i}
                                className={`bi bi-star${
                                  i + 1 <= testimonial.rating ? "-fill" : ""
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
