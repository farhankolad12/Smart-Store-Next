import { AddressType } from "../page";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import usePostReq from "../../hooks/usePostReq";

export default function SingleAddress({
  addr,
  setAddresses,
}: {
  addr: AddressType;
  setAddresses: Function;
}) {
  const { execute, loading } = usePostReq("/delete-address");

  const router = useRouter();

  async function handleDelete() {
    try {
      const res = await execute({
        id: addr.id,
      });

      if (!res.success) {
        return toast.error(res.message, {
          position: "top-right",
        });
      }

      setAddresses((prev: any) => {
        return prev.filter((addr1: AddressType) => addr1.id !== addr.id);
      });
      toast.success("Changes saved!", {
        position: "top-right",
      });
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
      });
    }
  }

  return (
    <>
      <div>
        <div className="d-flex flex-column gap-2 pb-4 border-bottom">
          <span>
            {addr.firstName} {addr.lastName}
          </span>
          <span>{addr.email}</span>
          <span>{addr.address1}</span>
          <span>{addr.address2}</span>
          <span>
            {addr.city} {addr.state}, India
          </span>
          <span>{addr.phone}</span>
        </div>
        <div className="d-flex gap-4 mt-3 mb-5">
          <button
            onClick={() => router.push(`/add-address/${addr.id}`)}
            className="d-flex btn p-0 fw-bold gap-2"
          >
            <i className="bi bi-pencil" />
            <span>Update</span>
          </button>
          <button
            onClick={handleDelete}
            className="d-flex btn p-0 fw-bold gap-2"
          >
            {loading ? (
              "loading..."
            ) : (
              <>
                <i className="bi bi-trash" />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
