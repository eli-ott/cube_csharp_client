import { IImage } from "../../../models/imageModel";
import BioProductCertificate from "../../../assets/images/products/bio-product-certificate.svg";
import Carousel from "../../common/carousel/Carousel";

interface ProductImageProps {
  images: IImage[];
  name: string;
  isBio: boolean;
}

const ProductDetailsImage = ({ images, name, isBio }: ProductImageProps) => {
  const carouselImages = images.map((image) => ({
    img: image.imageUrl,
    name: name,
  }));
  return (
    <div className="relative rounded-md shadow-md flex justify-center items-center">
      <Carousel carouselDataProps={carouselImages} />
      {isBio && (
        <img
          src={BioProductCertificate}
          alt="Produit Bio"
          className="absolute bottom-2 right-2 m-2 w-10 h-14 md:w-12 md:h-16"
        />
      )}
    </div>
  );
};

export default ProductDetailsImage;
