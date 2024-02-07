import { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AttributesFilter({ attr }: { attr: any }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const prev = searchParams.get("attributes")?.split(",") || [];

  async function handleAttributes(
    watch: string,
    e: ChangeEvent<HTMLInputElement>
  ) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (e.target.checked) {
      params.set("attributes", [...prev, watch].join(","));
      router.replace(`/shop?${params.toString()}`);
    } else {
      params.set("attributes", prev.filter((p: any) => p !== watch).join(","));
      router.replace(`/shop?${params.toString()}`);
    }
  }

  return (
    <div className="my-3 px-3">
      <span className="text-uppercase fw-bold">{attr.name}</span>
      <div className="d-flex flex-column gap-2 mt-2">
        {attr.variants.map((l: string) => {
          return (
            <div key={l} className="d-flex align-items-center gap-1">
              <input
                onChange={async (e) => {
                  await handleAttributes(l, e);
                }}
                type="checkbox"
                id={l}
                checked={prev.some(
                  (c: string) => c.toLowerCase() === l.toLowerCase()
                )}
                value={l}
              />
              <label htmlFor={l}>{l}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
