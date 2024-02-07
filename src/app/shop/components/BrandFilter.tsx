import { useSearchParams } from "next/navigation";

type BrandFilterType = {
  brand: any;
  handleBrands: Function;
};

export default function BrandFilter({ brand, handleBrands }: BrandFilterType) {
  const searchParams = useSearchParams();

  const prev = searchParams.get("brands")?.split(",") || [];

  return (
    <div className="d-flex align-items-center gap-1">
      <input
        onChange={async (e) => {
          await handleBrands(brand.name.toLowerCase(), e);
        }}
        type="checkbox"
        id={brand.name}
        checked={prev.some((c) => c === brand.name.toLowerCase())}
        value={brand.name}
      />
      <label htmlFor={brand.name}>{brand.name}</label>
    </div>
  );
}
