import usePostReq from "@/app/hooks/usePostReq";
import { Order } from "@/app/orders/components/OrdersPage";
import { FormEvent, useRef } from "react";
import { toast } from "react-toastify";

export default function MessageForm({ order }: { order: Order }) {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { execute, loading } = usePostReq("/order/add-message");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const message = messageRef.current?.value;

    try {
      const res = await execute({ id: order._id, message });
      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }

      toast.success("Message added!", {
        position: "top-right",
      });
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center mt-4"
    >
      <textarea
        ref={messageRef}
        defaultValue={order.message ? order.message : ""}
        className="form-control w-100"
        rows={7}
      ></textarea>
      <button
        disabled={loading}
        className="btn btn-danger px-5 rounded-pill text-uppercase fw-bold mt-4"
      >
        {loading ? "..." : "send"}
      </button>
    </form>
  );
}
