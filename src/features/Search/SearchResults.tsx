import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import { IProduct } from "../../models/productModel";
import { IPagedResponse } from "../../models/pagedModel";
import { ProductItems } from "../../components/ui/product/ProductItems";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import InfiniteScrollObserver from "../../components/common/InfiniteScrollObserver";
import ProductFiltersBar from "../../components/ui/product/filters/ProductFiltersBar";

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

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
    setIsLoading(true);
    setProducts(null);

    const fetchProducts = async () => {
      const familyIdParam = searchParams.get("family_id");
      const family_id = familyIdParam ? Number(familyIdParam) : undefined;
      const data = await getProducts({ name: search, page: 1, family_id });
      setProducts(data);
      setIsLoading(false);
    };

    fetchProducts();
  }, [search, searchParams]);

  const loadMore = async () => {
    if (products && page < products.totalPages) {
      setIsLoading(true);
      const nextPage = page + 1;
      const familyIdParam = searchParams.get("family_id");
      const family_id = familyIdParam ? Number(familyIdParam) : undefined;

      const data = await getProducts({
        name: search,
        page: nextPage,
        family_id,
      });

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

  return (
    <>
      <ProductFiltersBar />
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

      {/* Render reusable infinite scroll observer */}
      <InfiniteScrollObserver
        onIntersect={loadMore}
        options={{ threshold: 0.5 }}
      />
    </>
  );
};

export default SearchResults;
