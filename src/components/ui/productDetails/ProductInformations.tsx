import React from 'react';
import { IProduct } from '../../../models/productModel';
import ProductDetailsImage from './ProductDetailsImage';
import { ProductRating } from '../product/ProductRating';
import ProductDetailsPrice from './ProductDetailsPrice';
import { AddToCartButton } from '../../../features/Search/AddToCartButton';

interface ProductInformationsProps {
	product: IProduct;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductInformations = ({ product, setLoading }: ProductInformationsProps) => {
	return (
		<div className="container mx-auto p-4">
			<div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-6 max-w-full">
				<div className="w-full md:min-w-[400px]">
					<ProductDetailsImage images={product.images} name={product.name} isBio={product.isBio} />
				</div>

				<div className="flex flex-col justify-between">
					<div>
						<h2 className="font-bold text-sm md:text-base lg:text-lg mt-1 leading-tight">{product.name}</h2>
						<div className="flex items-center space-x-1 text-sm my-1">
							<ProductRating reviews={product.reviews} />
							{product.reviews?.length ? <span className="text-xs text-gray-600">({product.reviews.length} avis)</span> : null}
						</div>

						<div className="text-sm text-gray-600 leading-tight mb-2">
							<hr className="mt-4" />
							<p className="text-xs my-2 italic">
								{product.description && product.description.length > 0 ? product.description : 'Aucune description'}
							</p>
							<hr className="mb-4" />
							<p className="truncate">{product.family.name}</p>
							<p className="truncate">{product.producerName}</p>
							<p>Cuvée: {product.year}</p>
						</div>
					</div>

					<div>
						{product.boxPrice && (
							<div className="font-bold mt-6">
								<p>Prix au carton:</p>
								<ProductDetailsPrice price={product.boxPrice ?? 0} discount={product.discount} />
							</div>
						)}
						{product.unitPrice && (
							<div className="font-bold mt-6">
								<p>Prix à l'unité:</p>
								<ProductDetailsPrice price={product.unitPrice ?? 0} discount={product.discount} />
							</div>
						)}
						<div className="mt-4 w-full sm:w-1/2 md:w-2/3 lg:w-1/3">
							<AddToCartButton product={product} setIsLoading={setLoading} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductInformations;
