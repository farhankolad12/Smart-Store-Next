import { useSearchParams } from "next/navigation";

type CollectionsFilter = {
  category: any;
  handleCollections: Function;
};

export default function CollectionsFilter({
  category,
  handleCollections,
}: CollectionsFilter) {
  const searchParams = useSearchParams();

  const prev = searchParams.get("collections")?.split(",") || [];

  return (
    <div className="d-flex justify-content-between align-items-center">
      <label htmlFor={category.name}>{category.name}</label>
      <input
        onChange={async (e) => {
          await handleCollections(category.name.split(" ")[0].toLowerCase(), e);
        }}
        id={category.name}
        type="checkbox"
        value={category.name}
        className="btn p-0"
        checked={prev.some(
          (c: string) => c === category.name.split(" ")[0].toLowerCase()
        )}
      />
    </div>
  );
}
