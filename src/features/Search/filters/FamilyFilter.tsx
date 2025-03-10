import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IPagedResponse } from "../../../models/pagedModel";
import { IFamily } from "../../../models/familyModel";
import { getFamilies } from "../../../services/products";

const FamilyFilter = () => {
  const [families, setFamilies] = useState<IPagedResponse<IFamily> | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFamily, setSelectedFamily] = useState<IFamily | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const fetchedFamilies = await getFamilies({ search: searchTerm });
        setFamilies(fetchedFamilies);
      } catch (error: unknown) {
        console.error("Une erreur inconnue est survenue");
      }
    };
    // debounced fetch
    const timer = setTimeout(fetchFamilies, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const familyIdParam = searchParams.get("family_id");
    if (familyIdParam && families && families.items.length > 0) {
      const familyId = Number(familyIdParam);
      const family = families.items.find((f) => f.familyId === familyId);

      if (family) {
        setSelectedFamily(family);
        setSearchTerm(family.name);
      }
    }
  }, [families, searchParams]);

  const selectFamily = (e: React.MouseEvent, family: IFamily) => {
    e.preventDefault();

    setSelectedFamily(family);
    setSearchTerm(family.name);

    const params = new URLSearchParams(searchParams);
    params.set("family_id", family.familyId.toString());
    setSearchParams(params);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (selectedFamily && selectedFamily.name !== value) {
      setSelectedFamily(null);
      const params = new URLSearchParams(searchParams);
      params.delete("family_id");
      setSearchParams(params);
    }
  };

  return (
    <div className="relative text-[10px] w-full md:w-1/3 m-2">
      <input
        className="p-2 rounded-xl bg-[#F8F4E3] w-full outline-black/50"
        type="text"
        placeholder="Filtrer par famille"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setShowSuggestions(false)}
      />
      {showSuggestions && families && (
        <ul className="absolute bg-[#F8F4E3] p-4 h-24 overflow-y-auto rounded-xl w-full">
          {families.items.map((family) => (
            <li
              key={family.familyId}
              onMouseDown={(e) => selectFamily(e, family)}
              style={{
                cursor: "pointer",
                fontWeight:
                  selectedFamily && selectedFamily.familyId === family.familyId
                    ? "bold"
                    : "normal",
              }}
            >
              {family.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FamilyFilter;
