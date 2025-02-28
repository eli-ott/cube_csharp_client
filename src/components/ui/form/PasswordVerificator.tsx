import React, { useEffect } from "react";

interface IPasswordVerificator {
  password: string;
  passwordConfirm: string;
}

const PasswordVerificator: React.FC<IPasswordVerificator> = ({
  password,
  passwordConfirm,
}) => {
  let strength = 0;

  useEffect(() => {
    if (password.length === 0) strength = 0;


  }, [password, passwordConfirm]);

  const fillColor =
    strength === 4
      ? "bg-green-500"
      : strength === 3
      ? "bg-orange-500"
      : strength >= 1
      ? "bg-red-400"
      : "bg-gray-300";

  return (
    <div className="w-full max-w-sm">
      <div className="flex">
        {[0, 1, 2, 3].map((barIndex) => (
          <div
            key={barIndex}
            className={`
              flex-1 h-2
              ${barIndex < strength ? fillColor : "bg-gray-300"}
              ${barIndex === 0 ? "rounded-l" : ""}
              ${barIndex === 3 ? "rounded-r" : ""}
              ${barIndex !== 0 ? "border-l border-gray-200" : ""}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordVerificator;
