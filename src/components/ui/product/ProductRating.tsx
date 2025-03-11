import { IReview } from "../../../models/reviewModel";

interface IProductRatingProps {
  reviews: IReview[];
}

const ProductRating = ({ reviews }: IProductRatingProps) => {
  if (!reviews?.length) {
    return <div className="text-sm">Pas encore d'avis</div>;
  }

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="text-sm text-yellow-500">
          {averageRating >= i + 1 ? "★" : "☆"}
        </span>
      ))}
      <span className="ml-2 text-sm">({averageRating.toFixed(1)})</span>
    </div>
  );
};

export { ProductRating };
