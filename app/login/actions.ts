"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { isProvider } from "@/lib/utils";

export async function singIn(formData: FormData) {
  try {
    const supabase = createClient();
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const {data:userData,error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return false;
    }

    return true
  } catch (error) {
    console.error("Error singIn: ", error);
    return false;
  }
}

interface userRegister {
  name: string;
  lastname: string;
  phone?: string;
  cellphone: string;
  web?: string;
  email: string;
  password: string;
}
export async function signup(userData: userRegister) {
  try {
    const supabase = createClient();

    const { data, error, ...props } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          ...userData,
        },
        emailRedirectTo: "/",
      },
    });

    if (error) {
      return false;
    }
    return true
  } catch (error) {
    console.error("Error signup: ", error);
    return false;
  }
}

export async function signInProvider(provider: string) {
  try {
    const supabase = createClient();

    if (isProvider(provider)) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `http://localhost:3000/auth/provider`,
        },
      });

      if (error) {
        return {error:true, data:null}
      }
      if (data?.url) {
        return {data, error}
      }
    }

    return {error:true, data:null};
  } catch (error) {
    console.error("Error signInProvider: ", error);
    return {error:true, data:null};
  }
}

export const resetPasswordForEmail = async (email: string) => {
  try {
    const supabase = createClient();
    const { data, error, ...props } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: "http://localhost:3000/auth/confirm",
      }
    );

    if (error) {
      return false
    }

    return data;
  } catch (error) {
    console.error("Error resetPasswordForEmail: ", error);
    return false;
  }
};

export async function signOut() {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      return true
    }
    return false
  } catch (error) {
    console.error("Error signOut: ", error);
    return false;
  }
}

export async function currentSesion() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return false;
    }
    return {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name,
      lastname: data.user.user_metadata?.lastname,
    };
  } catch (error) {
    console.error("Error currentSesion: ", error);
    return false;
  }
}
