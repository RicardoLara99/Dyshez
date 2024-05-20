"use server";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "../login/actions";

export const updatePasswordForEmail = async (
  code: string,
  new_password: string
) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.updateUser({
      password: new_password,
      data: {
        token: code,
      },
    });
    console.log('data login', data,error)
    if (error) {
      return false;
    }
    return true
    
  } catch (error) {
    console.error("Error updatePasswordForEmail: ", error);
    return false
  }
};
