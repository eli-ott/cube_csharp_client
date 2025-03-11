import React from "react";
import RegisterForm from "../../features/Auth/RegisterForm";

const Register: React.FC = () => {
  return (
    <main className="h-[100vh] w-[100vw] flex items-center justify-center styled-bg">
      <RegisterForm />
    </main>
  );
};

export default Register;
