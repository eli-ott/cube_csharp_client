import { IImage } from "../../../models/imageModel";
import { IProduct } from "../../../models/productModel";
import { ProductDetailButton } from "./ProductDetailButton";
import { ProductImage } from "./ProductImage";
import ProductPrice from "./ProductPrice";
import { ProductRating } from "./ProductRating";
import PlaceHolderImage from "../../../assets/images/placeholder.png";
import { AddToCartButton } from "../../../features/Search/AddToCartButton";
import { useState } from "react";
import ItemStateLoader from "../ItemStateLoader";

const ProductItem = ({ product }: { product: IProduct }) => {
  const {
    name,
    unitPrice,
    images,
    reviews,
    family,
    producerName,
    year,
    discount,
  } = product;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultImage = {
    imageUrl: PlaceHolderImage,
  } as IImage;

  return (
    <div className="flex flex-col bg-[#F8F4E3] p-4 rounded-md shadow-lg text-[#333333] relative">
      <ProductImage
        image={images[0] ?? defaultImage}
        name={name}
        isBio={product.isBio}
      />

      <h2 className="font-bold text-sm md:text-base lg:text-lg mt-1 line-clamp-2 leading-tight">
        {name}
      </h2>

      <div className="flex items-center space-x-1 text-sm my-1">
        <ProductRating reviews={reviews} />
        {reviews?.length ? (
          <span className="text-xs text-gray-600">({reviews.length} avis)</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 justify-between flex-grow">
        {/* Product details */}
        <div className="flex flex-col text-sm text-gray-600 leading-tight mb-2">
          <p className="truncate">{family.name}</p>
          <p className="truncate">{producerName}</p>
          <p>Cuvée: {year}</p>
        </div>

        {/* Price and buttons positionned at the end */}
        <div className="flex flex-col gap-1 mt-2">
          <ProductPrice price={unitPrice ?? 0} discount={discount} />
          <ProductDetailButton />
          <AddToCartButton
            productId={product.productId}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
      {isLoading ? <ItemStateLoader /> : null}
    </div>
  );
};

export { ProductItem };
