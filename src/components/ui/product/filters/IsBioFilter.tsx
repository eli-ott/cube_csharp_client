import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const IsBioFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = searchParams.get("is_bio");
  const [selectedOption, setSelectedOption] = useState<string>(
    initial === "true" || initial === "false" ? initial : "any"
  );

  useEffect(() => {
    const current = searchParams.get("is_bio");
    setSelectedOption(
      current === "true" || current === "false" ? current : "any"
    );
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    const params = new URLSearchParams(searchParams);
    if (value === "any") {
      params.delete("is_bio");
    } else {
      params.set("is_bio", value);
    }
    setSearchParams(params);
  };

  return (
    <div className="m-2 text-[10px] w-full md:w-1/3">
      <select
        className="p-2 rounded-xl bg-[#F8F4E3] w-full"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="any" hidden>
          Article bio (Oui/Non)
        </option>
        <option value="any">Tous</option>
        <option value="true">Bio</option>
        <option value="false">Pas bio</option>
      </select>
    </div>
  );
};

export default IsBioFilter;
