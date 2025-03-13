import React, { useState } from "react";
import {
  passwordValidator,
  IPasswordConfirmation,
} from "../../utils/passwordValidator";
import { updateCustomerPassword } from "../../services/customer";
import { notify } from "../../utils/notify";

interface CustomerChangePasswordProps {
  onClose: () => void;
}

const CustomerChangePassword: React.FC<CustomerChangePasswordProps> = ({
  onClose,
}) => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // États pour gérer la visibilité des mots de passe
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // États pour savoir si l'utilisateur a commencé à taper
  const [oldPasswordTouched, setOldPasswordTouched] = useState<boolean>(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState<boolean>(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    useState<boolean>(false);

  const [passwordValidation, setPasswordValidation] =
    useState<IPasswordConfirmation>({
      ok: true,
      message: "",
      strength: 0,
    });

  const savePassword = async () => {
    try {
      if (passwordValidation.ok) {
        await updateCustomerPassword(oldPassword, newPassword);
        onClose();
      } else {
        notify("Mot de passe non valide","error")
        throw new Error("Mot de passe non valide");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handlePasswordValidation = (
    password: string,
    passwordConfirm: string
  ) => {
    const result = passwordValidator({ password, passwordConfirm });
    setPasswordValidation(result);
  };

  const isFormValid =
    oldPassword.trim() !== "" &&
    newPassword.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    newPassword === confirmPassword &&
    passwordValidation.ok;



  const getInputClass = (value: string, touched: boolean, isValid: boolean) => {
    if (!touched || value.trim() === "") {
      return "w-full pr-10 border border-gray-300 bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6A1B1A]";
    }
    return isValid
      ? "w-full pr-10 border border-[#6A1B1A] bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6A1B1A]"
      : "w-full pr-10 border border-red-500 bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6A1B1A]";
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto relative"
      >
        <h2 className="text-2xl font-semibold text-[#6A1B1A] mb-4">
          Changer le mot de passe
        </h2>
        <div className="space-y-4">
          {/* Ancien mot de passe */}
          <div>
            <label className="block text-gray-700">Ancien mot de passe</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                className={getInputClass(oldPassword, oldPasswordTouched, true)}
                value={oldPassword}
                onChange={(e) => {
                  if (!oldPasswordTouched) setOldPasswordTouched(true);
                  setOldPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {!showOldPassword ? (
                  <img
                    src={
                      require("../../assets/icons/form_icons/form_visible.svg")
                        .default
                    }
                    alt="visible"
                    title="Afficher"
                  />
                ) : (
                  <img
                    src={
                      require("../../assets/icons/form_icons/form_visible_off.svg")
                        .default
                    }
                    alt="invisible"
                    title="Masquer"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Nouveau mot de passe */}
          <div>
            <label className="block text-gray-700">Nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                className={getInputClass(
                  newPassword,
                  newPasswordTouched,
                  passwordValidation.ok
                )}
                value={newPassword}
                onChange={(e) => {
                  if (!newPasswordTouched) setNewPasswordTouched(true);
                  const val = e.target.value;
                  setNewPassword(val);
                  handlePasswordValidation(val, confirmPassword);
                }}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {!showNewPassword ? (
                  <img
                    src={
                      require("../../assets/icons/form_icons/form_visible.svg")
                        .default
                    }
                    alt="Afficher"
                    title="Afficher"
                  />
                ) : (
                  <img
                    src={
                      require("../../assets/icons/form_icons/form_visible_off.svg")
                        .default
                    }
                    alt="Masquer"
                    title="Masquer"
                  />
                )}
              </button>
            </div>
            {newPasswordTouched &&
              newPassword.trim() !== "" &&
              !passwordValidation.ok && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordValidation.message}
                </p>
              )}
          </div>

          {/* Confirmer le nouveau mot de passe */}
          <div>
            <label className="block text-gray-700">
              Confirmer le nouveau mot de passe
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={getInputClass(
                  confirmPassword,
                  confirmPasswordTouched,
                  confirmPassword === newPassword
                )}
                value={confirmPassword}
                onChange={(e) => {
                  if (!confirmPasswordTouched) setConfirmPasswordTouched(true);
                  const val = e.target.value;
                  setConfirmPassword(val);
                  handlePasswordValidation(newPassword, val);
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {!showConfirmPassword ? (
                  <img
                    src={
                      require("../../assets/icons/form_icons/form_visible.svg")
                        .default
                    }
                    alt="visible"
                    title="Afficher"
                  />
                ) : (
                  <img
                    src={
                      require("../../assets/icons/form_icons/form_visible_off.svg")
                        .default
                    }
                    alt="invisible"
                    title="Masquer"
                  />
                )}
              </button>
            </div>
            {confirmPasswordTouched &&
              confirmPassword.trim() !== "" &&
              newPassword !== confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  Les mots de passe doivent être identiques.
                </p>
              )}
          </div>

          <div className="flex flex-col md:flex-row md:justify-between mt-4 space-y-2 md:space-y-0 md:space-x-2">
            <button
              className={` bg-green-600 text-white px-4 py-2 rounded-lg w-full md:w-auto ${
                !isFormValid ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={()=>savePassword()}
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

export default CustomerChangePassword;
