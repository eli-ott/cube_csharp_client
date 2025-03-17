import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../services/products";
import { IProduct } from "../models/productModel";

interface ProductContextType {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: React.PropsWithChildren) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProducts();
        if (productList) {
          const limitedProducts = productList.items.length > 5 ? productList.items.slice(0, 5) : productList.items; // Récupérer uniquement les 5 premiers produits si la liste en contient plus de 5
          setProducts(limitedProducts); 
        } else {
          toast.error("Erreur lors de la récupération des produits.");
        }
      } catch (error) {
        toast.error("Erreur lors de la récupération des produits.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};