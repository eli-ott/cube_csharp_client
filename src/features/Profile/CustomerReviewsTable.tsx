import React, { useEffect, useState } from "react";
import { IReview } from "../../models/reviewModel";
import { useUser } from "../../hooks/CustomerContext";
import NotFound from "../../components/NotFound";
import { useNavigate } from "react-router-dom";

const CustomerReviewsTable: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[] | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setReviews(user.reviews);
    }
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.round(rating);
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={index < fullStars ? "text-yellow-500" : "text-gray-300"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (!reviews || reviews.length === 0) {
    return (
      <>
        {" "}
        <h1 className="text-[#333333] text-2xl font-semibold">Mes avis</h1>{" "}
        <NotFound text="Vous n'avez laissé aucun avis." />
      </>
    );
  }

  return (
    <>
      <h1 className="text-[#333333] text-2xl">Mes avis</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {reviews.map((review, index) => (
          <div key={index} onClick={()=>navigate(`/product/${review.productId}`)} className="bg-white p-4 rounded-lg shadow">
            <div className="mb-2">
              <p className="font-semibold">
                {review.customerFirstName || "Anonyme"}{" "}
                {review.customerLastName || ""}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(review.creationTime).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-2">{renderStars(review.rating)}</div>
            <div>
              <p className="text-gray-700">
                {review.comment ? review.comment : "Pas de commentaire."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomerReviewsTable;
