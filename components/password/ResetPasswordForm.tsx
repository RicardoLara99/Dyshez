import React, { FormEvent, useState } from "react";
import { InputIcon } from "../inputIcon";
import { NextButtonText } from "../NextButtonText";
import { resetPasswordForEmail } from "@/app/login/actions";
import { formDataToObject } from "@/lib/utils";
interface LoginFormProps {
  showResetPass: (show: boolean) => void;
}
export const ResetPasswordForm = ({ showResetPass }: LoginFormProps) => {
  const [showMessage, setShowMessage] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const object = formDataToObject(formData);
    const data = await resetPasswordForEmail(object.email);
    if (data) {
      setShowMessage(
        "Correo enviado con exito. Por favor verifica tu bandeja de entrada."
      );
    } else {
      setShowMessage(
        "Ha ocurrido un error inesperado, por favor. Vuelve a intentarlo mas tarde."
      );
    }
  };
  return (
    <div className="w-full transition-opacity duration-700 ease-in">
      <div className="flex justify-between w-full font-bold text-xl">
        Forgot Password
      </div>
      <div className={`w-full transition-opacity duration-700 ease-in`}>
        <p className={`text-base text-start mt-6 text-secondary`}>
          Enter the email associated with yout account and we sill send you an
          email with instructions for forgetting yout password
        </p>
        {showMessage && <p className="pt-4 text-primary">{showMessage}</p>}
      </div>

      <div className="pt-5">
        <form className="flex flex-col gap-4 my-2" onSubmit={handleSubmit}>
          <InputIcon
            inputProps={{
              placeholder: "Correo o teléfono",
              id: "email",
              name: "email",
              required: true,
            }}
            imageProps={{
              src: "/icons/at.svg",
              width: 18,
              height: 18,
            }}
            containerProps={{
              className: "relative",
            }}
          />

          <NextButtonText
            actionButton={() => {}}
            textButton="Continuar"
            paragh="Remember Password?"
            redirect={{
              text: "Login",
              url: "",
              action: () => showResetPass(false),
            }}
          />
        </form>
      </div>
    </div>
  );
};
