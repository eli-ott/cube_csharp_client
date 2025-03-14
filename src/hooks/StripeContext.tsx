import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../utils/env";
import { Outlet } from "react-router-dom";
import { useCart } from "./CartContext";
import { determinePriceAfterDiscount } from "../utils/prices";
import { useUser } from "./CustomerContext";

// This is your test secret API key.
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51R2IISJRjn4L8ep0pS25YJdrKdvGnyTXen4NwfISbRyYaHi93Ngm0s0Y4EAu6amEI6BThTlJ4XshjOF9KvZqNIMz00aOgI2lDr"
);

interface IAppearance {
  theme: "flat" | "stripe" | "night" | undefined;
  variables: {
    colorPrimary: string;
    colorBackground: string;
    colorText: string;
    colorDanger: string;
    fontFamily: string;
    spacingUnit: string;
    borderRadius: string;
  };
}

const StripeContext = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { cartLines, cartId } = useCart();
  const { user } = useUser();

  useEffect(() => {
    const fetchClientSecret = async (): Promise<string> => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      };

      const regularItems = cartLines?.filter((c) => !c.isSetAside) || [];

      const items = regularItems.map((line) => ({
        productId: line.product.productId,
        id: line.product.name,
        amount: (line.product.unitPrice ?? line.product.boxPrice ?? 0) * 100,
        discountedAmount: line.product.discount
          ? determinePriceAfterDiscount(
              line.product.unitPrice ?? line.product.boxPrice ?? 0,
              line.product.discount?.value ?? 0
            ) * 100
          : undefined,
        quantity: line.quantity,
      }));

      const safeCartId = cartId?.toString();

      const body = JSON.stringify({
        items,
        customerId: user?.customerId.toString(),
        cartId: safeCartId,
      });

      const response = await fetch(`${BASE_URL}/create-payment-intent`, {
        method: "POST",
        headers: headers,
        body,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch client secret");
      }

      const json = await response.json();

      if (!json.clientSecret) {
        throw new Error("Failed to fetch client secret");
      }
      setClientSecret(json.clientSecret);

      return json.clientSecret;
    };

    if (cartLines.length > 0 && cartId && user) {
      fetchClientSecret();
    }
  }, [cartLines, cartId, user]);

  const appearance: IAppearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "2px",
      borderRadius: "15px",
    },
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <>
      {clientSecret ? (
        <Elements
          key={clientSecret}
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <Outlet />
        </Elements>
      ) : (
        <div>Loading payment details...</div>
      )}
    </>
  );
};

export default StripeContext;
