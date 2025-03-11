import RedirectionButton from "../../common/RedirectionButton";

const CartEmpty = () => {
  const placeholderSrc =
    require("../../../assets/images/cart_page/empty_cart_placeholder.svg").default;
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center max-h-xl mb-10">
      <img
        src={placeholderSrc}
        className="h-54 w-54 md:h-64 md:w-64"
        alt="Panier vide"
        title="Panier vide"
      />
      <h2 className="text-2xl mb-10">Votre panier est vide</h2>
      <RedirectionButton label="Découvrir nos articles" destination="/search" />
    </div>
  );
};

export default CartEmpty;
