import { OrderStatus } from "@/app/orders/components/OrdersPage";

export default function OrderStatusRow({ st }: { st: OrderStatus }) {
  return (
    <tr>
      <td>
        {new Date(st.changedAt).toLocaleDateString(undefined, {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </td>
      <td>{st.name}</td>
    </tr>
  );
}
