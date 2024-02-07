import { formatCurrency } from "../../utils/formatCurrency";
import AttributesFilter from "./AttributesFilter";
import BrandFilter from "./BrandFilter";
import CollectionsFilter from "./CollectionsFilter";
import MultiRangeSlider from "./MultiRangeSlider";

type FilterMobile = {
  setFilterSection: Function;
  handleBrands: Function;
  handleCollections: Function;
  minPrice: number;
  maxPrice: number;
  setMinPrice: Function;
  setMaxPrice: Function;
  filters: any;
  handlePrice: Function;
};

export default function FilterShopMobile({
  setFilterSection,
  handleBrands,
  handleCollections,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  filters,
  handlePrice,
}: FilterMobile) {
  return (
    <div className="container-fluid">
      <div className="bg-light p-3">
        <button
          className="btn p-0 d-flex algin-items-center justify-content-between w-100"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collections"
          aria-expanded="false"
          aria-controls="collections"
        >
          <strong className="text-uppercase">collections</strong>
          <i className="bi bi-chevron-down" />
        </button>
        <div className="collapse" id="collections">
          <div className=" d-flex flex-column gap-2 mt-3">
            {filters.categories.map((category: any) => {
              return (
                <CollectionsFilter
                  category={category}
                  key={category._id}
                  handleCollections={handleCollections}
                />
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={() => setFilterSection(false)}
        className="btn btn-dark rounded-pill m-auto d-flex gap-3 my-3"
      >
        <i className="bi bi-check-lg" />
        <span>OK</span>
      </button>
      <div className="border border-2-light">
        <div className="border-bottom border-2-light p-3">
          <button
            className="btn d-flex algin-items-center justify-content-between w-100 "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#brand"
            aria-expanded="false"
            aria-controls="brand"
          >
            <strong className="text-uppercase">brand</strong>
            <i className="bi bi-chevron-down" />
          </button>
          <div className="collapse" id="brand">
            <div className="d-flex flex-column gap-2 mt-2">
              {filters.brands.map((brand: any) => {
                return (
                  <BrandFilter
                    handleBrands={handleBrands}
                    brand={brand}
                    key={brand._id}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-bottom border-2-light p-3">
          {filters.attributes.map((attr: any) => {
            return <AttributesFilter attr={attr} key={attr._id} />;
          })}
        </div>
        <div className="border-bottom border-2-light p-3">
          <button
            className="btn d-flex algin-items-center justify-content-between w-100 "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#price"
            aria-expanded="false"
            aria-controls="price"
          >
            <strong className="text-uppercase">price</strong>
            <i className="bi bi-chevron-down" />
          </button>
          <div className="collapse" id="price">
            <div className="mt-3 pb-5 px-3">
              <span className="text-uppercase fw-bold">price</span>
              <br />
              <span>{`${formatCurrency(minPrice)} - ${formatCurrency(
                maxPrice
              )}`}</span>
              <MultiRangeSlider
                handlePrice={handlePrice}
                min={0}
                max={50000}
                onChange={({ min, max }: { min: number; max: number }) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
