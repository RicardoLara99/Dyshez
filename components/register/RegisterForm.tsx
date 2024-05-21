import React, { FormEvent, useState } from "react";
import { InputIcon } from "../inputIcon";
import { NextButtonText } from "../NextButtonText";
import { CheckBox } from "../checkbox";
import { formDataToObject, formInputs } from "@/lib/utils";
import { signup } from "@/app/login/actions";
import { ZodIssue, z } from "zod";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [error, setError] = useState("");
  const [errorForm, setErrorForm] = useState<ZodIssue[]>([]);
  const router=useRouter()

  const { toast } = useToast()

  const formSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    lastname: z.string().min(1, "Los apellidos son requeridos"),
    cellphone: z
      .string()
      .min(10, "El número de celular debe tener al menos 10 dígitos")
      .max(15, "El número de celular no puede exceder 15 dígitos")
      .regex(/^\+?\d+$/, "El número de celular debe ser válido"),
    phone: z
      .string()
      .regex(/^\+?\d*$/, "El número de teléfono debe ser válido")
      .optional(),
    email: z
      .string()
      .min(1, "El email es requerido")
      .email("Debe ser un email válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const object = formDataToObject(formData);
    const userObject = {
      name: object.name,
      lastname: object.lastname,
      phone: object.phone,
      cellphone: object.cellphone,
      web: object.web,
      email: object.email,
      password: object.password,
    };

    try {
      formSchema.parse(userObject);
      setErrorForm([]);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrorForm(e.errors);
      }
      return;
    }

    if (object?.password !== object?.verify) {
      
      setError(
        "Contraseñas diferentes, por favor ingresa una contraseña segura"
      );
      return;
    }
    toast({
      variant:'destructive',
      title:'Creando cuenta ',
      description:'Estás a nada de formar parte de nuestra gran familia 😁 ',
      className: "text-primary"
    })

    const data=await signup(userObject)

    if(!data){
      toast({
        variant:'destructive',
        title:'',
        description:'Ocurrio un error al crear tu cuenta. Por favor intentalo mas tarde 😁 ',
        className: "text-primary"
  
      })
      setError('Ocurrio un error al crear tu cuenta. Por favor intentalo mas tarde')
      return
    }
    toast({
      variant:'destructive',
      title:'¡Cuenta creada con exíto!  😎',
      description:'Verifica tu correo electronico para confirmar la creación de la cuenta  😁',
      className: "text-primary bg-primary-accepted-bg"

    })
    setTimeout(() => {
      router.refresh()
    }, 1000);
  };

  return (
    <div className="h-full">
      {error && <p className="text-primary pt-2">{error}</p>}
      <form
        className="flex flex-col justify-between h-full gap-4 my-2"
        onSubmit={handleRegister}
      >
        <div className="grid grid-cols-2 gap-y-6 gap-x-3 justify-center my-6">
          {formInputs.map((input, i) => {
            const hasError = errorForm.find(
              (err) => err.path[0] === input.inputProps.name
            );
            return (
              <div key={`input-${i}`}>
                <InputIcon {...input} />
                {hasError && (
                  <p className="text-primary pt-4">{hasError.message}</p>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <CheckBox id={"terms"} text={"Acepto los términos y condiciones"} />
          <NextButtonText
            actionButton={() => {}}
            textButton="Crear cuenta"
            paragh="Si ya tienes un restaurante en Dyshez y quieres agregar una nueva sucursal, conoce cómo hacerloss"
          />
        </div>
      </form>
    </div>
  );
};
