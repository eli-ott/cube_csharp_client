import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { IProduct } from "../../models/productModel";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/CustomerContext";
import {
  createCustomerProductReview,
  getCustomerProductReview,
  updateCustomerProductReview,
} from "../../services/reviews";
import { toast } from "react-toastify";
import { IReview } from "../../models/reviewModel";

interface ProductCommentFormProps {
  product: IProduct;
}

const ProductCommentForm = ({ product }: ProductCommentFormProps) => {
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<IReview | null>(null);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchUserReview = async () => {
      const data = await getCustomerProductReview(
        user!.customerId,
        product.productId
      );

      if (data) {
        setComment(data?.comment || "");
        setRating(data?.rating || 0);
        setReview(data);
      }
    };

    if (isLoggedIn && user) {
      fetchUserReview();
    }
  }, [user, isLoggedIn, product.productId]);

  const updateReview = async () => {
    if (review?.comment === comment && review?.rating === rating) {
      toast.info("Aucune modification n'a été apportée à votre avis");
      return;
    }

    const updatedReview = await updateCustomerProductReview({
      customerId: user!.customerId,
      productId: product.productId,
      rating: rating,
      comment: comment,
    });

    if (updatedReview) {
      setReview(updatedReview);
      toast.success("Votre avis a bien été mis à jour");
    }
  };

  const addReview = async () => {
    const addedReview = await createCustomerProductReview({
      customerId: user!.customerId,
      productId: product.productId,
      rating: rating,
      comment: comment,
    });

    if (addedReview) {
      setReview(addedReview);
      toast.success("Votre avis a bien été ajouté");
    }
  };

  return (
    <div className="flex flex-col mt-6 w-full">
      <textarea
        className="w-full h-20 mt-4 p-2 text-sm border border-gray-500 rounded-xl focus:border-2 focus:border-black focus:outline-none"
        placeholder="Donner mon avis sur le produit"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        disabled={!isLoggedIn}
      />

      <div className="flex flex-row w-full items-center justify-between mt-2">
        <StarRating rating={rating} onRatingChange={setRating} />
        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#A63E36] text-white rounded-md px-4 py-1 cursor-pointer"
          >
            Se connecter pour ajouter un avis
          </button>
        ) : review ? (
          <button
            onClick={() => updateReview()}
            className="bg-[#A63E36] text-white rounded-md px-4 py-1 cursor-pointer"
          >
            Mettre à jour mon avis
          </button>
        ) : (
          <button
            onClick={() => addReview()}
            className="bg-[#A63E36] text-white rounded-md px-4 py-1 cursor-pointer"
          >
            Ajouter mon avis
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCommentForm;
