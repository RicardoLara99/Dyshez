"use client";
import { NextButtonText } from "@/components/NextButtonText";
import { InputIcon } from "@/components/inputIcon";
import SelectLenguage from "@/components/login/SelectLenguage";
import { formDataToObject } from "@/lib/utils";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { updatePasswordForEmail } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Index() {
  const [error, setError] = useState("");
  const router=useRouter()
  const { toast } = useToast()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const object = formDataToObject(formData);

    if (object.password != object.verify) {
      setError(
        "Contraseñas diferentes, por favor ingresa una contraseña segura"
      );
    }
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    setError("Actualizando contraseña, enseguida se te redirigira al login.");
    const data = await updatePasswordForEmail(code || "", object.password);

    if (!data) {
      setError(
        "Ha ocurrido un error inesperado, por favor intentar nuevamente mas tarde."
      );
    }
    toast({
      variant:'destructive',
      title:'¡Contraseña actualizada!  😎',
      description:'En tu próximo inicio de sesión, tendrás que usarla 🥳 ',
      className: "text-primary bg-primary-accepted-bg"

    })
    router.push('/')


  };
  return (
    <main className="flex-auto w-full px-4 py-8 sm:px-6 md:py-6 max-w-[110rem] max-h-[85vh]">
      <div className="flex min-h-max flex-col lg:flex-row justify-center h-[82vh] gap-4 lg:gap-0 md">
        <div className="flex flex-col align-top justify-start lg:min-h-full lg:w-[30%] ">
          <Image
            className=""
            src="/dyshez-logo.svg"
            alt="Next.js Logo"
            width={190}
            height={47}
            priority
          />
          <p className="text-primary font-bold pt-3 text-lg">
            ¡Bienvenido de vuelta!
          </p>
        </div>

        <div className="flex flex-row shadow-login min-h-full lg:w-[70%] overflow-hidden">
          <div
            className={`flex flex-col min-h-full shadow-login w-full  transition-all duration-500 ease-in-out sm:max-w-[39%] p-7 overflow-auto`}
          >
            <div className="w-full transition-opacity duration-700 ease-in">
              <div className="flex justify-between w-full font-bold text-xl">
                Forgot Password
              </div>
              <div className={`w-full transition-opacity duration-700 ease-in`}>
                <p className={`text-base text-start mt-6 text-secondary`}>
                  Enter new password
                </p>
                {error && <p className="text-primary pt-4">{error}</p>}
              </div>

              <div className="pt-6">
                <form
                  className="flex flex-col gap-4 my-2"
                  onSubmit={handleSubmit}
                >
                  <InputIcon
                    inputProps={{
                      id: "password",
                      name: "password",
                      type: "password",
                      placeholder: "Contraseña",
                      required: true,
                    }}
                    imageProps={{
                      src: "/icons/Password.svg",
                      width: 18,
                      height: 18,
                    }}
                    containerProps={{}}
                  />
                  <InputIcon
                    inputProps={{
                      id: "verify",
                      name: "verify",
                      type: "password",
                      placeholder: "Contraseña",
                      required: true,
                    }}
                    imageProps={{
                      src: "/icons/Password.svg",
                      width: 18,
                      height: 18,
                    }}
                    containerProps={{}}
                  />

                  <NextButtonText
                    actionButton={() => {}}
                    textButton="Continuar"
                    paragh="Remember Password?"
                    redirect={{
                      text: "Login",
                      url: "/login",
                    }}
                  />
                </form>
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden flex sm:min-h-full sm:w-full w-0 bg-register transition-all duration-500 ease-in-out bg-cover bg-no-repeat bg-center bg-secondary-foreground`}
          >
            <div className="flex w-full justify-end p-5">
              <SelectLenguage />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
