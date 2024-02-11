import Parser from "html-react-parser";
import { ProductType } from "@/app/components/LatestProd";
import { formatCurrency } from "../../utils/formatCurrency";
import { toast } from "react-toastify";
import usePostReq from "../../hooks/usePostReq";
import { useAuth } from "../../context/AuthContext";

export default function CartItemRow({
  item,
  setSubTotal,
  setShippingTotal,
}: {
  item: ProductType;
  setSubTotal: Function;
  setShippingTotal: Function;
}) {
  const { execute, loading } = usePostReq("/delete-cart");
  const { setCartItems } = useAuth();

  async function handleDelete() {
    try {
      const res = await execute({
        id: item._id,
        selectedVariantId: item.selectedVariantId,
      });

      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }

      if (item.selectedVariantId) {
        setSubTotal((prevNum: number) => {
          return (
            prevNum -
            +item.variations.lists.filter(
              (l) => l.id === item.selectedVariantId
            )[0].discountedPrice *
              item.quantity
          );
        });
      } else {
        setSubTotal(
          (prevNum: number) => prevNum - item.discountedPrice * item.quantity
        );
      }

      setCartItems((prev: ProductType[]) => {
        if (item.selectedVariantId) {
          return prev.filter(
            (cartItem) => cartItem.selectedVariantId !== item.selectedVariantId
          );
        }

        return prev.filter((cartItem) => cartItem._id !== item._id);
      });

      setShippingTotal(
        (prev: number) =>
          prev - (item.shippingConfig.price ? item.shippingConfig.price : 0)
      );

      toast.success("Removed from cart!", {
        position: "top-right",
      });
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  }

  return (
    <div className="d-flex flex-wrap gap-4 border-bottom align-items-start justify-content-between p-4">
      <img src={item.imgs[0].link} alt="Product" width="100px" height="100px" />
      <div className="d-flex flex-column gap-2">
        <strong>{item.name}</strong>
        <span style={{ width: "300px", overflowWrap: "break-word" }}>
          {Parser(item.description.slice(0, 78))}
        </span>
        {item.selectedVariantId && (
          <strong>
            {item.variations.attributeName}:{" "}
            {
              item.variations.lists.filter(
                (l) => l.id === item.selectedVariantId
              )[0].name
            }
          </strong>
        )}
      </div>
      <input
        type="text"
        style={{ width: "50px" }}
        defaultValue={item.quantity}
        disabled
      />
      <strong className="fw-bold fs-4">
        {formatCurrency(
          item.variations.attributeName
            ? +item.variations.lists.filter(
                (l) => l.id === item.selectedVariantId
              )[0].discountedPrice * item.quantity
            : item.discountedPrice * item.quantity
        )}
      </strong>
      <button onClick={handleDelete} className="btn">
        {loading ? "..." : <i className="bi bi-trash fs-4" />}
      </button>
    </div>
  );
}
