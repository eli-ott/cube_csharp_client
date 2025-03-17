import { IReview } from "../../../models/reviewModel";
import { ProductRating } from "../product/ProductRating";

interface ProductReviewProps {
  review: IReview;
}

const ProductReview = ({ review }: ProductReviewProps) => {
  return (
    <div className="flex flex-col mt-4 border border-black rounded-md p-2">
      <div className="flex flex-row items-center">
        <span className="font-bold">{review.customerFirstName}</span>
        <span className="text-sm text-gray-600 ml-2">
          {review.updateTime.slice(0, 10)}
        </span>
      </div>

      <p className="text-sm">{review.comment}</p>
      <ProductRating reviews={[review]} />
    </div>
  );
};

export default ProductReview;
