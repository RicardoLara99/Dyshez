import { InputIcon } from "@/components/inputIcon";
import { NextButtonText } from "../NextButtonText";
import { FormEvent, useState } from "react";
import { singIn } from "@/app/login/actions";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  showResetPass: (show: boolean) => void;
}
export default function LoginForm({ showResetPass }: LoginFormProps) {
  const [error, setError] = useState("");
  const { toast } = useToast()
  const router=useRouter()

  const handleLogin =async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      toast({
        variant:'destructive',
        title:'Inciando sesión',
        description:'Estamos buscando tu información 👀',
        className: "text-primary"

      })
      const formData = new FormData(event.currentTarget);

      setTimeout(async() => {
        const data = await singIn(formData);
        console.log('data front',data)
        if (!data) {
          toast({
            variant:'destructive',
            title:'Información no encontrada 😮 ',
            description:'Por favor verifica tus credenciales 😉 ',
            className: "text-primary bg-primary-rejected-bg"
    
          })
          return
        }
        toast({
          variant:'destructive',
          title:'¡Información encontrada!  😎',
          description:'Te redirigiremos enseguida 🥳 ',
          className: "text-primary bg-primary-accepted-bg"
  
        })
        setTimeout(() => {
          router.push('/')
        }, 1000);
      }, 1000);
     
    } catch (error) {}
  };
  return (
    <div>
      {error && <p className="text-primary">{error}</p>}
      <form className="flex flex-col gap-4 my-2" onSubmit={handleLogin}>
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
        <p
          className="text-xs m-0 pl-2 cursor-pointer"
          onClick={() => {
            showResetPass(true);
          }}
        >
          <a className="text-primary">¿Olvidaste tu contraseña?</a>
        </p>

        <NextButtonText
          actionButton={() => {}}
          textButton="Continuar"
          paragh="¿Cambiaste tu teléfono?"
        />
      </form>
    </div>
  );
}
