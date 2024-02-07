import { useAuth } from "../context/AuthContext";
import usePostReq from "../hooks/usePostReq";
import { formatCurrency } from "../utils/formatCurrency";
import { ProductType } from "./LatestProd";
import { toast } from "react-toastify";

export default function CartRow({
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
    <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
      <div className="d-flex align-items-center gap-4">
        <img src={item.imgs[0].link} alt="Prodcut" width="70px" height="70px" />
        <div className="d-flex flex-column gap-1">
          <span>
            {item.quantity} x {item.name}
          </span>
          {item.variations.attributeName && (
            <strong>
              {item.variations.attributeName}:{" "}
              {
                item.variations.lists.filter(
                  (v) => v.id === item.selectedVariantId
                )[0].name
              }
            </strong>
          )}
          <span className="fs-5">
            {formatCurrency(
              item.variations.attributeName
                ? +item.variations.lists.filter(
                    (v) => v.id === item.selectedVariantId
                  )[0].discountedPrice * item.quantity
                : item.discountedPrice * item.quantity
            )}
          </span>
        </div>
      </div>
      <button onClick={handleDelete} className="btn p-0 ">
        {loading ? "..." : <i className="bi bi-trash fs-5 text-danger" />}
      </button>
    </div>
  );
}
