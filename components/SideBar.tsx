"use client";
import { signOut } from "@/app/login/actions";
import { MenuLogoutIcon } from "@/lib/icons/MenuLogoutIcon";
import { MenuOrderIcon } from "@/lib/icons/MenuOrderIcon";
import { MenuPictureIcon } from "@/lib/icons/MenuPictureIcon";
import Image from "next/image";
import {  usePathname, useRouter } from "next/navigation";
import React from "react";
import { useToast } from "./ui/use-toast";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast()

  const handleLogout = async() => {
    toast({
      variant:'destructive',
      title:'Saliendo ',
      description:'Estamos limpiando tu sesión, hasta la próxima 😁 ',
      className: "text-primary"

    })

    const data =await signOut();
    if(data){
      router.push("/login")
      return
    }
    toast({
      variant:'destructive',
      title:'Ocurrrio un error ',
      description:'No pudimos cerrar tu sesión. intenta recargar la pagina 😁 ',
      className: "text-primary"
    })
  };

  const handleRedirect = (path: string) => {
    router.push(path);
  };
  const pageSelected = usePathname();
  if (pageSelected !== "/" && pageSelected !== "/pictures") {
    return <></>;
  }
  return (
    <div className="border fixed top-0 left-0 h-[60px] overflow-hidden transition-all duration-300 ease-in-out w-[60px] hover:w-[170px] bg-white z-50 hover:h-[250px] lg:h-full lg:hover:h-full">
      <div className="">
        <div className="relative p-2">
          <Image
            src="/icons/logo-restaurant.svg"
            alt="Restaurant-Logo"
            width={40}
            height={40}
          />
          <Image
            className="absolute bottom-2 left-9"
            src="/icons/verified.svg"
            alt="Verify-Logo"
            width={15}
            height={15}
          />
        </div>
        <div>
          <div className="pt-4 text-secondary">
            <div
              className="relative flex items-center h-full overflow-hidden justify-start cursor-pointer hover:underline hover:text-primary "
              onClick={() => {
                handleRedirect("/");
              }}
            >
              <div
                className={`${
                  pageSelected === "/" ? `bg-pink-500 ` : ` bg-transparent `
                }absolute top-0 -left-4 w-5 h-10 rounded-xl`}
              ></div>
              <div className="h-10 flex align-middle w-12 p-2 pl-4">
                <MenuOrderIcon
                  color={pageSelected === "/" ? "#E3026F" : "#9C9C9C"}
                />
              </div>
              <span className="h-full flex align-middle w-full p-2 pl-4 ">
                Orders
              </span>
            </div>

            <div
              className="relative flex items-center h-full overflow-hidden justify-start cursor-pointer hover:underline hover:text-primary "
              onClick={() => {
                handleRedirect("/pictures");
              }}
            >
              <div
                className={`${
                  pageSelected === "/pictures"
                    ? `bg-pink-500 `
                    : ` bg-transparent `
                }absolute top-0 -left-4 w-5 h-10 rounded-xl`}
              ></div>
              <div className="h-9 flex align-middle w-12 p-2 pl-4">
                <MenuPictureIcon
                  color={pageSelected === "/pictures" ? "#E3026F" : "#9C9C9C"}
                />
              </div>
              <span className="h-full flex align-middle w-full p-2 pl-4 ">
                Pictures
              </span>
            </div>
          </div>
        </div>
        <div className="relative lg:absolute py-4 bottom-0 cursor pointer text-secondary">
          <div
            className="relative flex items-center h-full overflow-hidden justify-start cursor-pointer hover:underline hover:text-primary "
            onClick={handleLogout}
          >
            <div className="h-9 flex align-middle w-12 p-2 pl-4">
              <MenuLogoutIcon color={"#9C9C9C"} />
            </div>
            <span className="h-full flex align-middle w-full p-2 pl-4 ">
              Cerrar sesión
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
