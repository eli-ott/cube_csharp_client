import BioProductCertificate from "../../../assets/images/products/bio-product-certificate.svg";
import { IImage } from "../../../models/imageModel";

interface ProductImageProps {
  image: IImage;
  name: string;
  isBio: boolean;
}

const ProductImage = (props: ProductImageProps) => {
  return (
    <div className="relative p-2 rounded-md shadow-md flex justify-center items-center bg-[#EEE7C7]">
      <img
        src={props.image.imageUrl}
        alt={props.name}
        className="object-scale-down h-[100px] md:h-[180px]"
      />
      {props.isBio && (
        <img
          src={BioProductCertificate}
          alt="Produit Bio"
          className="absolute bottom-0 right-0 m-2 w-6 h-8 md:w-8 md:h-12"
        />
      )}
    </div>
  );
};

export { ProductImage };
