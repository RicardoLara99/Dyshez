import { Provider } from "@supabase/supabase-js";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formDataToObject = (formData: FormData) => {
  const object: Record<string, any> = {};
  formData.forEach((value, key) => {
    if (object.hasOwnProperty(key)) {
      if (!Array.isArray(object[key])) {
        object[key] = [object[key]];
      }
      object[key].push(value);
    } else {
      object[key] = value;
    }
  });
  return object;
};

export const  isProvider=(input: any): input is Provider=> {
  return [
    'apple', 'azure', 'bitbucket', 'discord', 'facebook', 'figma', 'github', 
    'gitlab', 'google', 'kakao', 'keycloak', 'linkedin', 'linkedin_oidc', 
    'notion', 'slack', 'spotify', 'twitch', 'twitter', 'workos', 'zoom', 'fly'
  ].includes(input);
}

export const getDate=(date:string)=>{
  let hours=new Date(date)?.getUTCHours()
  let minutes=new Date(date)?.getUTCMinutes()
  let notation="a.m."
    if(hours>12){
      hours-=12
      notation="p.m."
    }
  return `${hours}:${minutes}${notation}`
}

export function sortArrayByField<T>(array: T[], fieldName:string, order: 'asc' | 'desc' = 'asc'): T[] {
  return array.sort((a, b) => {
      let fieldA = fieldName.split('.').reduce((obj: any, key: string) => obj[key], a);
      let fieldB = fieldName.split('.').reduce((obj: any, key: string) => obj[key], b);

      // Convertir fechas a objetos Date si es necesario
      if (fieldName === 'created_at') {
          fieldA = new Date(fieldA);
          fieldB = new Date(fieldB);
      }

      if (fieldA < fieldB) {
          return order === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
          return order === 'asc' ? 1 : -1;
      }
      return 0;
  });
}

export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};
const sizeImage = { width: 18, height: 18 };
  const containerProps = { className: "relative" };

export const formInputs = [
  {
    inputProps: {
      placeholder: "Nombre(s) *",
      id: "name",
      name: "name",
      required: true,
    },
    imageProps: {
      src: "/icons/profile.svg",
      ...sizeImage,
    },
    containerProps,
  },
  {
    inputProps: {
      placeholder: "Apellidos *",
      id: "lastname",
      name: "lastname",
      required: true,
    },
    imageProps: {
      src: "/icons/profile.svg",
      ...sizeImage,
    },
    containerProps,
  },
  {
    inputProps: {
      placeholder: "+52 123 456 78 90 *",
      id: "cellphone",
      name: "cellphone",
      type: "number",
      required: true,
    },
    imageProps: {
      src: "/icons/Mobile.svg",
      ...sizeImage,
    },
    containerProps,
  },
  {
    inputProps: {
      placeholder: "+52 123 456 78 90 ",
      id: "phone",
      name: "phone",
      required: false,
      type: "number",
    },
    imageProps: {
      src: "/icons/Phone.svg",
      ...sizeImage,
    },
    containerProps,
  },
  {
    inputProps: {
      placeholder: "Sitio web",
      id: "web",
      name: "web",
      required: false,
      type: "url",
    },
    imageProps: {
      src: "/icons/Web-Icon.svg",
      ...sizeImage,
    },
    containerProps,
  },
  {
    inputProps: {
      placeholder: "Email *",
      id: "email",
      name: "email",
      required: true,
      type: "email",
    },
    imageProps: {
      src: "/icons/Email.svg",
      ...sizeImage,
    },
    containerProps,
  },
  {
    inputProps: {
      placeholder: "Constraseña *",
      id: "password",
      name: "password",
      required: true,
      type: "password",
    },
    imageProps: {
      src: "/icons/Password.svg",
      ...sizeImage,
    },
    containerProps,
  },
  {
    inputProps: {
      placeholder: "Verificar contraseña *",
      id: "verify",
      name: "verify",
      required: true,
    },
    imageProps: {
      src: "/icons/Password.svg",
      ...sizeImage,
    },
    containerProps,
  },
];

