import { IPagedResponse } from "../../../models/pagedModel";
import { IProduct } from "../../../models/productModel";
import LoadingSpinner from "../LoadingSpinner";
import { ProductItem } from "./ProductItem";

const ProductItems = ({
  products,
  isLoading,
}: {
  products: IPagedResponse<IProduct> | null;
  isLoading: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 min-[425px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2 w-9/10 md:w-8/10">
      {products?.items.map((product) => (
        <ProductItem key={product.productId} product={product} />
      ))}
      {isLoading && (
        <LoadingSpinner />
      )}
    </div>
  );
};

export { ProductItems };
