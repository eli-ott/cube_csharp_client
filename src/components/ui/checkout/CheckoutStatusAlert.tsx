import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutStatusAlert = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const redirect_status = searchParams.get("redirect_status");

    if (redirect_status === "succeeded") {
      toast.success("Paiement effectué avec succès");
    }

    if (redirect_status === "failed") {
      toast.error("Il y a eu un problème lors du paiement");
    }
  }, [searchParams]);

  return <></>;
};

export default CheckoutStatusAlert;
