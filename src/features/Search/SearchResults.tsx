import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getProducts } from "../../services/products";
import { IProduct } from "../../models/productModel";
import { IPagedResponse } from "../../models/pagedModel";
import { ProductItems } from "../../components/ui/product/ProductItems";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  const [products, setProducts] = useState<IPagedResponse<IProduct> | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const infiniteScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
    setIsLoading(true);
    setProducts(null);
    const fetchProducts = async () => {
      const data = await getProducts({ name: search, page: 1 });
      setProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, [search]);

  useEffect(() => {
    const loadMore = async () => {
      setIsLoading(true);
      if (products && page < products.totalPages) {
        const nextPage = page + 1;
        const data = await getProducts({ name: search, page: nextPage });
        if (data && products) {
          setProducts({
            items: [...products.items, ...data.items],
            currentPage: data.currentPage ?? 1,
            pageSize: data.pageSize ?? products.pageSize,
            totalCount: data.totalCount ?? products.totalCount,
            totalPages: data.totalPages ?? products.totalPages,
          });
        }
        setPage(nextPage);
        setIsLoading(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          products &&
          page < products.totalPages
        ) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );
    if (infiniteScrollRef.current) {
      observer.observe(infiniteScrollRef.current);
    }
    return () => observer.disconnect();
  }, [products, page, search]);

  return (
    <>
      <h1 className="text-md md:text-3xl font-bold text-center my-8">
        {isLoading
          ? "Recherche en cours..."
          : search === ""
          ? "Tous les produits"
          : products?.totalCount
          ? `${products?.totalCount} ${
              products?.totalCount === 1 ? "résultat" : "résultats"
            } pour la recherche "${search}"`
          : `Aucun résultat pour la recherche "${search}"`}
      </h1>
      {!products ? (
        <LoadingSpinner />
      ) : (
        <ProductItems products={products} isLoading={isLoading} />
      )}

      {/* h-1 so it has a few height pixels to be detected by the intersection observer */}
      <div ref={infiniteScrollRef} className="h-1"></div>
    </>
  );
};

export default SearchResults;
