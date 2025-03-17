import { useOrder } from "../../hooks/OrderContext";
import OrderTable from "../../features/Order/OrderTable";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Order = () => {
  const { order } = useOrder();

  return (
    <main
      className={`flex flex-col justify-start items-center ${
        order ? "" : "pt-10"
      }`}
    >
      {order ? <OrderTable /> : <LoadingSpinner />}
    </main>
  );
};

export default Order;
