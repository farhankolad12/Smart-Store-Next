import { ProductType } from "@/app/components/LatestProd";
import { formatCurrency } from "@/app/utils/formatCurrency";

export default function OrderProductRow({ product }: { product: ProductType }) {
  return (
    <tr>
      <td>
        <div className="d-flex flex-column">
          <span className="fw-bold">
            {product.name}{" "}
            {product.selectedVariantId &&
              `(${product.variations?.attributeName}: ${
                product.variations?.lists.filter(
                  (l) => l.id === product.selectedVariantId
                )[0].name
              })`}
          </span>
        </div>
      </td>
      <td>{product.quantity}</td>
      <td>{formatCurrency(product.price)}</td>
      <td>{formatCurrency(product.price * product.quantity)}</td>
    </tr>
  );
}
