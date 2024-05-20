import { signInProvider } from "@/app/login/actions";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface provider {
  name: string;
  srcImage: string;
}

export function SignIn({
  name,
  srcImage,
}: provider & React.ComponentPropsWithRef<typeof Button>) {
  const router=useRouter()
  const { toast } = useToast()

  return (
    <form
      action={async () => {
        const {data, error}=await signInProvider(name);
        if(error){
          toast({
            variant:'destructive',
            title:'Ocurrio un error 😮 ',
            description:`El proveedor ${name} no esta disponible, por favor intenta mas tarde 😉` ,
            className: "text-primary bg-primary-rejected-bg"
    
          })
          return
          //redirect(data?.url);
        }
        toast({
          variant:'destructive',
          title:'Redirigiendo 😮 ',
          description:`Serás redirigido a ${name} por favor sigue las instrucciones para el inicio de sesión 😉` ,
          className: "text-primary bg-primary-rejected-bg"
  
        })
        setTimeout(() => {
          if(data?.url){
            router.push(data.url)
          }
        }, 1500);
      }}
    >
      <Button className="min-w-[6.5rem] rounded-full bg-secondary-foreground">
        <Image alt={name} src={srcImage} width={24} height={24} />
      </Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        // "use server"
      }}
      className="w-full"
    >
      <Button className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
