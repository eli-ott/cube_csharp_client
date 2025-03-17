import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PriceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultMin = 0;
  const defaultMax = 3000;

  // Store the values as strings so that an empty string allows the placeholder to show
  const [priceMin, setPriceMin] = useState<string>(
    searchParams.get("price_min") || ""
  );
  const [priceMax, setPriceMax] = useState<string>(
    searchParams.get("price_max") || ""
  );

  useEffect(() => {
    const minParam = searchParams.get("price_min") || "";
    const maxParam = searchParams.get("price_max") || "";
    setPriceMin(minParam);
    setPriceMax(maxParam);
  }, [searchParams]);

  const handleMaxBlur = () => {
    const newMax = priceMax === "" ? defaultMax : Number(priceMax);
    const newMin = priceMin === "" ? defaultMin : Number(priceMin);
    if (newMax < newMin) {
      setPriceMin(String(newMax));
    }
    updatePriceMaxQueryParams();
  };
  
  const handleMinBlur = () => {
    const newMin = priceMin === "" ? defaultMin : Number(priceMin);
    const newMax = priceMax === "" ? defaultMax : Number(priceMax);
    if (newMin > newMax) {
      setPriceMax(String(newMin));
    }
    updatePriceMinQueryParams();
  };

  const updatePriceMinQueryParams = () => {
    const params = new URLSearchParams(searchParams);
    params.set("price_min", priceMin.toString());
    setSearchParams(params);
  };

  const updatePriceMaxQueryParams = () => {
    const params = new URLSearchParams(searchParams);
    params.set("price_max", priceMax.toString());
    setSearchParams(params);
  };

  return (
    <div className="m-2 text-[10px] w-full md:w-1/3">
      <div className="flex flex-row gap-2">
        <div className="relative w-full">
          <input
            type="number"
            className="w-full p-2 pr-8 rounded-xl bg-[#F8F4E3] outline-black/50"
            placeholder="Min price"
            min={defaultMin}
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            onBlur={handleMinBlur}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            €
          </span>
        </div>
        <div className="relative w-full">
          <input
            type="number"
            className="w-full p-2 pr-8 rounded-xl bg-[#F8F4E3] outline-black/50"
            placeholder="Max price"
            min={defaultMin}
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            onBlur={handleMaxBlur}
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            €
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
