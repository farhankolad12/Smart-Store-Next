import useGetReq from "@/app/hooks/useGetReq";
import ShopSkeleton from "./ShopSkeleton";
import CollectionsFilter from "./CollectionsFilter";
import { ChangeEvent, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import ProductSkeleton from "./ProductSkeleton";
import { ProductType } from "@/app/components/LatestProd";
import ProductCom from "@/app/components/ProductCom";
import BrandFilter from "./BrandFilter";
import AttributesFilter from "./AttributesFilter";
import MultiRangeSlider from "./MultiRangeSlider";
import { formatCurrency } from "@/app/utils/formatCurrency";
import FilterShopMobile from "./FilterShopMobile";
import { useDebouncedCallback } from "use-debounce";
import { useAuth } from "@/app/context/AuthContext";

export default function ShopPage() {
  const router = useRouter();
  const params = useParams();

  const searchParams = useSearchParams();

  const [filterSection, setFilterSection] = useState(false);

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("min")) || 0
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("max")) || 50000
  );

  // const {
  //   error: _error,
  //   loading: _loading,
  //   userData: filters,
  // } = useGetReq("/filters", {});

  const { filters, filtersLoading } = useAuth();

  const {
    error,
    loading,
    userData: products,
  } = useGetReq("/get-product-filter", {
    searchParams,
  });

  async function handleCollections(
    watch: string,
    e: ChangeEvent<HTMLInputElement>
  ) {
    const params = new URLSearchParams(searchParams);
    const prev = searchParams.get("collections")?.split(",") || [];

    if (e.target.checked) {
      const newCollections = [...prev, watch].join(",");

      params.set("collections", newCollections);
    } else {
      const newCollections = prev.filter((p: any) => p !== watch).join(",");

      params.set("collections", newCollections);
    }

    router.replace(`/shop?${params.toString()}`);
  }

  async function handleBrands(brand: string, e: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);
    const prev = searchParams.get("brands")?.split(",") || [];
    if (e.target.checked) {
      const newBrands = [...prev, brand].join(",");

      params.set("brands", newBrands);
    } else {
      const newBrands = prev.filter((p: any) => p !== brand).join(",");

      params.set("brands", newBrands);
    }
    router.replace(`/shop?${params.toString()}`);
  }

  async function handlePrice() {
    const params = new URLSearchParams(searchParams);

    params.set("min", minPrice.toString());
    params.set("max", maxPrice.toString());
    params.set("page", "1");

    router.replace(`/shop?${params.toString()}`);
  }

  const debounced = useDebouncedCallback((val) => {
    const params = new URLSearchParams(searchParams);
    params.set("q", val);
    params.set("page", "1");

    router.replace(`/shop?${params.toString()}`);
  }, 1000);

  return filtersLoading ? (
    <ShopSkeleton />
  ) : (
    <div className="container d-flex gap-5 my-5">
      <div className="filter-shop">
        <div className="d-flex flex-column gap-3">
          <div className="p-3 bg-light">
            <strong className="text-uppercase">collection</strong>
          </div>
          <div className="d-flex flex-column gap-1 bg-light p-3">
            {filters.categories?.map((category: any) => {
              return (
                <CollectionsFilter
                  key={category._id}
                  category={category}
                  handleCollections={handleCollections}
                />
              );
            })}
          </div>
        </div>
        <div className="border border-2-light my-3">
          <div className="bg-light p-3">
            <strong className="text-uppercase">filter by</strong>
          </div>
          <div className="my-3 px-3">
            <span className="text-uppercase fw-bold">brand</span>
            <div className="d-flex flex-column gap-2 mt-2">
              {filters.brands?.map((brand: any) => {
                return (
                  <BrandFilter
                    key={brand._id}
                    handleBrands={handleBrands}
                    brand={brand}
                  />
                );
              })}
            </div>
          </div>
          {filters.attributes.map((attr: any) => {
            return <AttributesFilter key={attr._id} attr={attr} />;
          })}
          <div className="mt-3 pb-5 px-3">
            <span className="text-uppercase fw-bold">price</span>
            <br />
            <span>{`${formatCurrency(minPrice)} - ${formatCurrency(
              maxPrice
            )}`}</span>
            <MultiRangeSlider
              min={0}
              max={50000}
              onChange={({ min, max }: { min: number; max: number }) => {
                setMinPrice(min);
                setMaxPrice(max);
              }}
              handlePrice={handlePrice}
            />
          </div>
        </div>
      </div>
      {filterSection ? (
        <FilterShopMobile
          filters={filters}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handleBrands={handleBrands}
          handleCollections={handleCollections}
          setFilterSection={setFilterSection}
          handlePrice={handlePrice}
        />
      ) : (
        <div className="filter-result">
          <h4 className="text-uppercase fw-bold">Collection</h4>
          <img
            src="https://img.freepik.com/free-vector/decorative-shubh-diwali-sale-banner-with-ethnic-diya_1017-40072.jpg?w=1380&t=st=1706181433~exp=1706182033~hmac=1f781b4e443763a3b01d284138067c9b588ec7f91fa2396156b0a9d6feb8235a"
            alt="Bg"
            width="100%"
            height="300px"
          />
          <div className="d-md-flex w-100 justify-content-between gap-4 bg-light p-3 my-4">
            <div className="w-100">
              <input
                type="text"
                className="rounded-pill form-control w-100"
                placeholder="Type & Enter..."
                defaultValue={searchParams.get("q") || ""}
                onChange={(e) => debounced(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="d-flex align-items-center">
              <label className="w-100" htmlFor="sort">
                Sort by:
              </label>
              <select
                defaultValue={searchParams.get("filterBy") || "relevance"}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  params.set("filterBy", e.target.value);

                  router.replace(`/shop?${params.toString()}`);
                }}
                id="sort"
                className="form-select"
              >
                <option value="relevance">Relevance</option>
                <option value="best-sellers">Best Sellers</option>
                <option value="a-z">Name, A to Z</option>
                <option value="z-a">Name, Z to A</option>
                <option value="low-high">Price, low to high</option>
                <option value="high-low">Price, high yo low</option>
              </select>
            </div>
            <button
              onClick={() => setFilterSection(true)}
              className="btn btn-dark px-5 d-lg-none"
              style={{ borderRadius: "35px" }}
            >
              Filter
            </button>
          </div>

          {loading ? (
            <div className="product-rows">
              {[...Array(6)].map((s, ind) => {
                console.log(s);

                return <ProductSkeleton key={ind} />;
              })}
            </div>
          ) : products.products.length ? (
            <div className="product-rows">
              {products.products.map((product: ProductType) => {
                return <ProductCom key={product._id} product={product} />;
              })}
            </div>
          ) : (
            <h3 className="text-center my-5 fw-bold">
              No products on this page
            </h3>
          )}

          {!loading && products && (
            <div className="d-flex gap-2 justify-content-center align-items-center mt-4">
              <button
                onClick={async () => {
                  const params = new URLSearchParams(searchParams);
                  const currentPage = searchParams.get("page") || "1";

                  params.set("page", (+currentPage - 1).toString());

                  router.replace(`/shop?${params.toString()}`);
                }}
                disabled={+(searchParams.get("page") || 1) === 1}
                className="btn btn-outline-dark text-center py-2 px-3"
              >
                <i className="bi bi-chevron-left" />
              </button>
              {[...Array(products.totalPages)].map((n, i) => {
                console.log(n);

                return (
                  <button
                    key={i + 1}
                    onClick={async () => {
                      const params = new URLSearchParams(searchParams);
                      params.set("page", (i + 1).toString());

                      router.replace(`/shop?${params.toString()}`);
                    }}
                    className={`btn btn${
                      +(searchParams.get("page") || 1) === i + 1
                        ? ""
                        : "-outline"
                    }-dark text-center py-2 px-3`}
                  >
                    {i + 1}
                  </button>
                );
              })}
              <button
                onClick={async () => {
                  const params = new URLSearchParams(searchParams);

                  const currentPage = searchParams.get("page") || "1";
                  params.set("page", (+currentPage + 1).toString());

                  router.replace(`/shop?${params.toString()}`);
                }}
                disabled={
                  +(searchParams.get("page") || 1) === products.totalPages ||
                  products.totalPages === 0
                }
                className="btn btn-outline-dark text-center py-2 px-3"
              >
                <i className="bi bi-chevron-right" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
