import CartLineTable from "../../features/Cart/CartLineTable";

const Cart = () => {


  return (
    <main className="flex flex-col justify-start pt-4 items-center">
      <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] text-center mt-1 mb-2">
        Mon panier
      </h1>
      <CartLineTable/>
    </main>
  );
};

export default Cart;
