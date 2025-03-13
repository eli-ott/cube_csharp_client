import React, { useState } from "react";
import { IProduct } from "../../../models/productModel";
import placeholder from "../../../assets/images/placeholder.png";
import RedirectionButton from "../../common/RedirectionButton";

interface CarouselHomeProps {
  products: IProduct[];
}

const CarouselHome: React.FC<CarouselHomeProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (products.length === 0) return null; // Pas de produits, pas de carousel
  const hasMultipleProducts = products.length > 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-full mx-auto styled-bg-home-carousel">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Déplacement selon l'index
          }}
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full flex flex-col items-center p-4"
            >
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0].imageUrl
                    : placeholder
                }
                alt={product.name}
                className="w-full h-96 object-contain rounded-lg" // Utilisation de object-cover et d'une hauteur ajustée
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">
                {product.supplier.firstName} {product.supplier.lastName}
              </p>
              <RedirectionButton label="En savoir plus" destination={`/product/${product.productId}`}/>
            </div>
          ))}
        </div>
      </div>

      {/* Flèches de navigation si plus d'un produit */}
      {hasMultipleProducts && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
};

export default CarouselHome;
