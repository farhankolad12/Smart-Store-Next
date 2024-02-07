import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import usePostReq from "../hooks/usePostReq";
import { ProductType } from "./LatestProd";

export default function CartButton({
  product,
  display,
  quantity,
  selectedVariant,
}: {
  product: ProductType;
  display: string;
  selectedVariant: undefined | any;
  quantity: number;
}) {
  const { currentUser, setCartItems } = useAuth();
  const router = useRouter();

  const { execute, loading } = usePostReq("/handle-cart");

  async function handleCart() {
    try {
      const res = await execute({
        productId: product._id,
        selectedVariantId: selectedVariant?.id,
        quantity,
      });

      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }
      setCartItems((prev: ProductType[]) => {
        const prevSubTotal = prev.length
          ? prev.reduce(function (prev, current) {
              return prev.subTotal > current.subTotal ? prev : current;
            }).subTotal
          : 0;

        if (
          prev.length === 0 ||
          (prev.every((item) => item._id !== product._id) &&
            prev.every(
              (item) => item.selectedVariantId !== selectedVariant?.id
            ))
        ) {
          return [
            ...prev,
            {
              ...product,
              selectedVariantId: selectedVariant?.id,
              quantity: quantity || 1,
              subTotal: product.variations.attributeName
                ? +product.variations.lists.filter(
                    (l) => l.id === selectedVariant?.id
                  )[0].discountedPrice + prevSubTotal
                : product.discountedPrice + prevSubTotal,
              shippingTotal: product.shippingConfig.price || 0,
              // ? product.shippingConfig.price
              // : 0 + prevShippingTotal,
            },
          ];
        }

        if (
          prev.length === 0 ||
          (prev.some((item) => item._id === product._id) &&
            prev.some((item) => item.selectedVariantId === selectedVariant?.id))
        ) {
          return prev.map((cartItem) => {
            if (
              cartItem._id === product._id &&
              cartItem.selectedVariantId === product.selectedVariantId
            ) {
              return {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                subTotal: product.variations.attributeName
                  ? +product.variations.lists.filter(
                      (l) => l.id === selectedVariant.id
                    )[0].discountedPrice + prevSubTotal
                  : product.discountedPrice + prevSubTotal,
                shippingTotal: product.shippingConfig.price || 0,
              };
            }
            return cartItem;
          });
        }

        if (
          prev.length === 0 ||
          (prev.some((item) => item._id === product._id) &&
            prev.some((item) => item.selectedVariantId !== selectedVariant?.id))
        ) {
          return [
            ...prev,
            {
              ...product,
              selectedVariantId: selectedVariant.id,
              quantity: quantity || 1,
              subTotal: product.variations.attributeName
                ? +product.variations.lists.filter(
                    (l) => l.id === selectedVariant.id
                  )[0].discountedPrice + prevSubTotal
                : product.discountedPrice + prevSubTotal,
              shippingTotal: product.shippingConfig.price || 0,
              // product.shippingConfig.price
              //   ? product.shippingConfig.price
              //   : 0 +  prevShippingTotal,
            },
          ];
        }

        if (
          prev.length === 0 ||
          prev.every((item) => item._id !== product._id)
        ) {
          return [
            ...prev,
            {
              ...product,
              selectedVariantId: undefined,
              quantity: quantity || 1,
              subTotal: product.variations.attributeName
                ? +product.variations.lists.filter(
                    (l) => l.id === selectedVariant?.id
                  )[0].discountedPrice + prevSubTotal
                : product.discountedPrice + prevSubTotal,
              shippingTotal: product.shippingConfig.price || 0,
            },
          ];
        }

        if (
          prev.length === 0 ||
          prev.some((item) => item._id === product._id)
        ) {
          return prev.map((cartItem) => {
            if (cartItem._id === product._id) {
              return {
                ...cartItem,
                quantity: ++cartItem.quantity,
                subTotal: product.variations.attributeName
                  ? +product.variations.lists.filter(
                      (l) => l.id === selectedVariant.id
                    )[0].discountedPrice + prevSubTotal
                  : product.discountedPrice + prevSubTotal,
                shippingTotal: product.shippingConfig.price || 0,
              };
            }
            return cartItem;
          });
        }
      });
      toast.success("Added to cart!", {
        position: "top-right",
      });
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        currentUser ? handleCart() : router.push("/login");
      }}
      style={{ borderRadius: "20px" }}
      className={`btn btn-danger px-4 py-2 add-cart d-${display} animate__animated animate__bounceIn`}
    >
      {loading ? "loading..." : "Add to cart"}
    </button>
  );
}
