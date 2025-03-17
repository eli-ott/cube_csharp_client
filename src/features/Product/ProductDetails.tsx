import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../models/productModel";
import { getProductById } from "../../services/products";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ProductCommentForm from "./ProductCommentForm";
import ProductReviewsList from "../../components/ui/productDetails/ProductReviewsList";
import ProductInformations from "../../components/ui/productDetails/ProductInformations";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      const data = await getProductById(Number(productId));
      setProduct(data);
    };

    fetchProduct();
    setLoading(false);
  }, [productId]);

  return (
    <div className="py-10 w-9/10">
      {loading && <LoadingSpinner />}

      {product && (
        <div className="flex flex-col text-[#333333]">
          <ProductInformations product={product} setLoading={setLoading} />

          <ProductCommentForm product={product} />

          <ProductReviewsList product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
