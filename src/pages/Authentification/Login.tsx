import React from "react";
import LoginForm from "../../features/Auth/LoginForm";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
  return (
    <main className="h-[100vh] w-[100vw] flex items-center justify-center styled-bg">
      <button onClick={()=>navigate("/")} className="absolute top-2 left-2 flex flex-row items-center cursor-pointer w-auto h-12">
        <img
          className="h-8 w-8"
          src={require("../../assets/icons/nav_icons/nav_home.svg").default}
          alt="Retour"
        />
        <span className="whitespace-nowrap text-lg font-semibold text-[#333333]">Retour à l'accueil</span>
      </button>

      <LoginForm />
    </main>
  );
};

export default Login;
