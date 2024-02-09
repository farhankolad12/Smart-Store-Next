import { Order } from "../components/OrdersPage";
import { formatCurrency } from "../../utils/formatCurrency";
import { useRouter } from "next/navigation";

export default function OrderRow({ order }: { order: Order }) {
  const router = useRouter();

  return (
    <tr>
      <td>{order._id}</td>
      <td>
        {new Date(order.createdAt).toLocaleDateString(undefined, {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </td>
      <td>{formatCurrency(order.totalPrice)}</td>
      <td>{order.status[order.status.length - 1].name}</td>
      <td className="text-center">-</td>
      <td>
        <button
          onClick={() => router.push(`/order/${order._id}`)}
          className="btn p-0 text-primary"
        >
          Details
        </button>
      </td>
    </tr>
  );
}
