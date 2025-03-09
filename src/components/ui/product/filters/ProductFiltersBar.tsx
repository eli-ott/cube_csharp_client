import FamilyFilter from "./FamilyFilter";
import IsBioFilter from "./IsBioFilter";
import PriceFilter from "./PriceFilter";

const ProductFiltersBar = () => {
  return (
    <div className="p-2 items-center bg-[#EEE7C7] w-full gap-4 flex flex-wrap md:flex-nowrap">
      <FamilyFilter />
      <IsBioFilter />
      <PriceFilter />
    </div>
  );
};

export default ProductFiltersBar;
