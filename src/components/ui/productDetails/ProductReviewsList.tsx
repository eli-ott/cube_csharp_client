import { IProduct } from "../../../models/productModel";
import ProductReview from "./ProductReview";

interface ProductReviewsListProps {
  product: IProduct;
}

const ProductReviewsList = ({ product }: ProductReviewsListProps) => {
  return (
    <div>
      <h2 className="font-bold text-gray-500 text-lg mt-8">
        Avis sur le produit
      </h2>
      <div>
        {product.reviews?.map((review) => (
          <ProductReview key={review.userId} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviewsList;
