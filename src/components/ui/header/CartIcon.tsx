import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/CartContext";
import { useAuth } from "../../../hooks/AuthContext";

const CartIcon= ({iconSize} : {iconSize:string;}) => {
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();
  const {counter} = useCart();

  return (
    <button
      onClick={isLoggedIn  ? ()=>navigate("/cart") : ()=>navigate("/login")}
      className={`bg-transparent border-none ${iconSize} flex justify-center items-center p-0 cursor-pointer`}
      aria-label={"Panier"}
      data-counter={counter ?? 0}
    >
      <img
        className="w-full h-full transition-all"
        src={require("../../../assets/icons/cart.svg").default}
        title={"Panier"}
        alt={"Loading"}
      />
    </button>
  );
};

export default CartIcon;
