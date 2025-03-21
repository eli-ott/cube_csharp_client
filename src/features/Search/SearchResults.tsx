import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import { IProduct } from "../../models/productModel";
import { IPagedResponse } from "../../models/pagedModel";
import { ProductItems } from "../../components/ui/product/ProductItems";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import InfiniteScrollObserver from "../../components/common/InfiniteScrollObserver";
import ProductFiltersBar from "./filters/ProductFiltersBar";
import NotFound from "../../components/NotFound";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");
  const [products, setProducts] = useState<IPagedResponse<IProduct> | null>(null);
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

      const priceMinParam = searchParams.get("price_min");
      const priceMaxParam = searchParams.get("price_max");
      const price_min = priceMinParam ? Number(priceMinParam) : undefined;
      const price_max = priceMaxParam ? Number(priceMaxParam) : undefined;

      const is_bio = searchParams.get("is_bio");

      const data = await getProducts({
        name: search,
        page: 1,
        family_id,
        price_min,
        price_max,
        is_bio: is_bio === "true" ? true : is_bio === "false" ? false : undefined,
      });

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

      const priceMinParam = searchParams.get("price_min");
      const priceMaxParam = searchParams.get("price_max");
      const price_min = priceMinParam ? Number(priceMinParam) : undefined;
      const price_max = priceMaxParam ? Number(priceMaxParam) : undefined;

      const is_bio = searchParams.get("is_bio");

      const data = await getProducts({
        name: search,
        page: nextPage,
        family_id,
        price_min,
        price_max,
        is_bio: is_bio === "true" ? true : is_bio === "false" ? false : undefined,
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
      <h1 className="text-md md:text-3xl font-bold text-center my-8 text-[#333333]">
        {isLoading
          ? "Recherche en cours..."
          : search === ""
          ? "Tous les produits"
          : products?.totalCount
          ? `${products?.totalCount} ${products?.totalCount === 1 ? "résultat" : "résultats"} pour la recherche "${search}"`
          : `Aucun résultat pour la recherche "${search}"`}
      </h1>

      {isLoading && !products ? (
        <LoadingSpinner />
      ) : products?.items.length === 0 ? (
        <NotFound text={`Aucun produit trouvé`} />
      ) : (
        <>
          <ProductItems products={products} isLoading={isLoading} />
          <InfiniteScrollObserver onIntersect={loadMore} options={{ threshold: 0.5 }} />
        </>
      )}
    </>
  );
};

export default SearchResults;
