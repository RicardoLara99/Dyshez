"use client";
import { Orders } from "@/components/orders/Orders";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const pageSelected = usePathname();
  const router=useRouter()
  if(pageSelected.includes("/login")){
    router.refresh()
  }
  return (
    <main className="flex flex-row shadow-login min-h-full w-[100%] overflow-hidden h-full">
      <div className=" pl-6 pr-0 pb-0 min-h-[100vh] w-full lg:ml-16">
        <h1 className="font-bold text-2xl text-center lg:text-left pt-5">
          Orders
        </h1>
        <Orders />
      </div>
    </main>
  );
}
