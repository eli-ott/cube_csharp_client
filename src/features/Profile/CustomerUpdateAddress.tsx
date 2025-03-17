import React, { useState } from 'react';

interface IUserAddress {
  addressLine: string;
  city: string;
  zipCode: string;
  country: string;
  complement: string | null;
}

interface CustomerUpdateAddressProps {
  userAddress: IUserAddress;
  updateAddress: (newAddress: IUserAddress) => void;
  setUserAddress: (value: IUserAddress) => void;
  onClose: () => void;
}

const CustomerUpdateAddress: React.FC<CustomerUpdateAddressProps> = ({
  userAddress,
  setUserAddress,
  updateAddress,
  onClose,
}) => {
  const [addressLine, setAddressLine] = useState<string>(userAddress.addressLine);
  const [city, setCity] = useState<string>(userAddress.city);
  const [zipCode, setZipCode] = useState<string>(userAddress.zipCode);
  const [country, setCountry] = useState<string>(userAddress.country);
  const [complement, setComplement] = useState<string>(userAddress.complement || '');

  const isFormValid = addressLine.trim() !== "" && city.trim() !== "" && zipCode.trim() !== "" && country.trim() !== "";

  const handleSaveClick = () => {
    if (!isFormValid) return;
    
    const newAddress = { 
      addressLine, 
      city, 
      zipCode, 
      country, 
      complement: complement.trim() === "" ? null : complement 
    };
    setUserAddress(newAddress);
    updateAddress(newAddress); // Appeler la fonction de mise à jour de l'adresse
    onClose(); // Fermer le formulaire
  };

  const inputClass = (value: string) =>
    `w-full border ${value.trim() === "" ? "border-red-500" : "border-[#6A1B1A]"} bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6A1B1A]`;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto relative">
        <h2 className="text-2xl font-semibold text-[#6A1B1A] mb-4">Update Address</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Adresse</label>
            <input
              type="text"
              className={inputClass(addressLine)}
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Ville</label>
            <input
              type="text"
              className={inputClass(city)}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Code Postal</label>
            <input
              type="text"
              className={inputClass(zipCode)}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Pays</label>
            <input
              type="text"
              className={inputClass(country)}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Complément d'Adresse (facultatif)</label>
            <input
              type="text"
              className="w-full border border-[#6A1B1A] bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6A1B1A]"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              placeholder="Complément d'adresse (facultatif)"
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between mt-4 space-y-2 md:space-y-0 md:space-x-2">
            <button
              className={`cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg w-full md:w-auto ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSaveClick}
              disabled={!isFormValid}
            >
              Sauvegarder
            </button>
            <button
              className="cursor-pointer bg-[#6A1B1A] text-white px-4 py-2 rounded-lg w-full md:w-auto opacity-50"
              onClick={onClose}
            >
              Retour
            </button>
          </div>
        </div>
        <button
          className="absolute top-4 right-4 text-white text-5xl"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CustomerUpdateAddress;
