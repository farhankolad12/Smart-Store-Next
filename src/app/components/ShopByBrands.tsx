import Carousel from "nuka-carousel";
import Link from "next/link";
import BrandSkeleton from "./BrandSkeleton";
import { useAuth } from "../context/AuthContext";

export type BrandType = {
  _id: string;
  name: string;
  img: { id: string; link: string };
};

const PAGE_WIDTH = window.innerWidth;

export default function ShopByBrands(/* {
  brands,
  loading,
}: {
  brands: any | undefined;
  loading: boolean | undefined;
} */) {
  const { filters, filtersLoading: loading } = useAuth();

  return (
    <div className="bg-white py-5 my-5">
      <div className="d-flex flex-column gap-2 header text-center my-3 py-4">
        <span
          style={{ letterSpacing: "2px" }}
          className="text-uppercase text-secondary fs-5"
        >
          smart store
        </span>
        <h2 className="fw-bold fs-1">Shop By Brands</h2>
      </div>
      <div className={`py-5`}>
        {loading ? (
          <Carousel
            enableKeyboardControls={true}
            pauseOnHover={true}
            renderBottomCenterControls={() => false}
            autoplay={true}
            cellSpacing={5}
            slidesToScroll={1}
            slidesToShow={PAGE_WIDTH >= 768 ? 5 : 1}
            wrapAround={true}
          >
            {[...Array(5)].map((s, ind) => {
              console.log(s);

              return <BrandSkeleton key={ind} />;
            })}
          </Carousel>
        ) : (
          filters.brands &&
          filters.brands.length && (
            <Carousel
              enableKeyboardControls={true}
              pauseOnHover={true}
              renderBottomCenterControls={() => false}
              autoplay={true}
              cellSpacing={5}
              slidesToScroll={1}
              slidesToShow={PAGE_WIDTH >= 768 ? 5 : 1}
              wrapAround={true}
            >
              {filters.brands.map((brand: BrandType) => {
                return (
                  <Link
                    key={brand._id}
                    href={`/shop?brands=${brand.name.toLowerCase()}`}
                    className={`${
                      PAGE_WIDTH >= 768
                        ? ""
                        : "d-flex flex-column align-items-center justify-content-center text-center"
                    }`}
                  >
                    <img
                      src={brand.img.link}
                      width="100px"
                      alt={brand.name}
                      style={{
                        aspectRatio: "3/2",
                        mixBlendMode: "color-burn",
                        objectFit: "contain",
                      }}
                    />
                  </Link>
                );
              })}
            </Carousel>
          )
        )}
      </div>
    </div>
  );
}
