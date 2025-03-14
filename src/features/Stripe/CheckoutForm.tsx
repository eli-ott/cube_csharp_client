import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCart } from "../../hooks/CartContext";
import CheckoutItem from "../../components/ui/checkout/CheckoutItem";
import CheckoutTotalPrice from "../../components/ui/checkout/CheckoutTotalPrice";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartLines } = useCart();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message ?? "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: { type: "accordion", defaultCollapsed: true },
    terms: { paypal: "always", card: "always" },
  };

  const selectCartLines = cartLines?.filter((c) => !c.isSetAside) || [];

  if (!stripe || !elements) {
    return <div>Loading...</div>;
  }

  return (
    <div
      id="checkout"
      className="flex items-center justify-center min-h-screen flex-col sm:flex-row w-9/10 gap-4"
    >
      <div className="w-full sm:w-6/10 lg:w-4/10 mb-6 sm:mb-0">
        <h1 className="text-2xl font-bold text-center mb-4">Vos produits</h1>
        <div className="flex flex-col overflow-y-auto sm:h-[700px]">
          {selectCartLines.map((cartLine) => (
            <CheckoutItem
              key={cartLine.product.productId}
              product={cartLine.product}
              quantity={cartLine.quantity}
            />
          ))}
        </div>
      </div>

      <form
        id="payment-form"
        className="w-full sm:w-4/10 rounded-sm items-center ml-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Paiement</h1>
        <h2 className="text-lg font-semibold text-center mb-4">
          Veuillez entrer vos informations de paiement
        </h2>

        <CheckoutTotalPrice cartLines={selectCartLines} />

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="bg-[#A63E36] hover:bg-[#6A1B1A]  text-white font-bold py-2 px-4 rounded-sm mb-10 mt-4"
          type="submit"
        >
          <span id="button-text">{isLoading ? <></> : "Pay now"}</span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};
