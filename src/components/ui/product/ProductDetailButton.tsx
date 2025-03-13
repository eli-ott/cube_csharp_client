import { useNavigate } from "react-router-dom";

interface ProductDetailButtonProps {
  productID: number;
}

const ProductDetailButton = ({ productID }: ProductDetailButtonProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(`/product/${productID}`)}
        className="bg-[#C2C2C2] w-full text-white text-xs font-bold py-2 px-4 rounded-md cursor-pointer"
      >
        Voir le détails
      </button>
    </div>
  );
};

export { ProductDetailButton };
