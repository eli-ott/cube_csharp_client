import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import MailInput from "../../components/ui/form/MailInput";
import { emailValidator } from "../../utils/emailValidator";
import { sendResetPasswordMail } from "../../services/authentification";

const ResetPasswordForm: React.FC = () => {
  const [mail, setMail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleMailChange = (value: string) => {
    setMail(value);
    const validation = emailValidator({ email: value });
    setError(validation.ok ? "" : validation.message);
  };

  const validateForm = async (e : React.FormEvent) => {
    e.preventDefault();
    if(mail){
      await sendResetPasswordMail(mail);
      setMail("");
    }
  };

  return (
    <>
      <button
        className="cursor-pointer absolute top-2 left-2 text-xl font-semibold"
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
          <p className="mb-4 text-center text-gray-700">
            Veuillez renseigner votre adresse mail. Vous recevrez un lien pour
            réinitialiser votre mot de passe.
          </p>
          <form className="flex flex-col gap-4">
            <MailInput
              placeholder="Adresse mail"
              typed={mail}
              onTyping={handleMailChange}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
            onClick={(e)=>validateForm(e)}
              type="submit"
              className={`${
                mail.length === 0 || error.length !== 0
                  ? "cursor-not-allowed bg-gray-400"
                  : "cursor-pointer bg-[#6A1B1A]"
              } w-full py-2 text-white rounded-lg`}
              disabled={mail.length === 0 || error.length !== 0}
            >
              Envoyer le mail
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
