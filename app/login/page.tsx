"use client";
import Image from "next/image";
import { useState } from "react";
import { RegisterForm } from "../../components/register/RegisterForm";
import LoginForm from "../../components/login/LoginForm";
import LoginButtons from "../../components/login/LoginButtons";
import { ResetPasswordForm } from "@/components/password/ResetPasswordForm";
import SelectLenguage from "@/components/login/SelectLenguage";

export default function Index() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showResetPass, setShowResetPass] = useState(false);

  const togglePanel = (show: boolean) => {
    setIsExpanded(show);
    setTimeout(() => {
      setShowRegisterForm(!show);
    }, 500);
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
            className={`flex flex-col min-h-full shadow-login w-full  transition-all duration-500 ease-in-out ${
              !isExpanded ? "max-w-[100%]" : "md:max-w-[39%]"
            } p-7 overflow-auto`}
          >
            {showResetPass ? (
              <>
                <ResetPasswordForm showResetPass={setShowResetPass} />
              </>
            ) : (
              <>
                <div>
                  <div className="flex justify-between w-full font-bold text-2xl">
                    <div
                      className={`pb-2 ${
                        !showRegisterForm && " border-black border-b-4"
                      } hover:animate-pulse `}
                      onClick={() => {
                        togglePanel(true);
                      }}
                      role="button"
                    >
                      <span
                        className={`${showRegisterForm && "text-secondary"}`}
                      >
                        Login
                      </span>
                    </div>
                    <div
                      className={`pb-2 ${
                        showRegisterForm && " border-black border-b-4"
                      } hover:animate-pulse`}
                      onClick={() => {
                        togglePanel(false);
                      }}
                      role="button"
                    >
                      <span
                        className={`${!showRegisterForm && "text-secondary"}`}
                      >
                        Register
                      </span>
                    </div>
                  </div>
                </div>

                {showRegisterForm ? (
                  <div
                    className={`w-full transition-opacity duration-700 ease-in ${
                      isExpanded ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <p className={`text-base text-center mt-6 `}>
                      Únete a la revolución, para comenzar a utilizar la
                      plataforma ingresa los siguientes datos y se parte del
                      movimiento de Dyshez
                    </p>
                    <RegisterForm />
                  </div>
                ) : (
                  <div
                    className={`flex flex-col align-middle justify-between h-full transition-opacity duration-700 ease-in ${
                      isExpanded ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className={`text-base text-center mt-6 `}>
                      Ingresa con tu correo electrónico o tu número de teléfono
                    </p>
                    <LoginForm showResetPass={setShowResetPass} />
                    <LoginButtons />
                  </div>
                )}
              </>
            )}
          </div>

          <div
            className={`overflow-hidden flex min-h-full bg-register transition-all duration-500 ease-in-out ${
              isExpanded ? "w-0 sm:w-full" : "w-0"
            } bg-cover bg-no-repeat bg-center bg-secondary-foreground`}
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
