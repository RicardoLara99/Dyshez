"use server";
import { createClient } from "@/utils/supabase/server";

interface order {
  fieldName: string;
  asc: boolean;
}
export const getOrdersWithPagination = async (
  bot: number,
  top: number,
  statusFilter: string,
  { fieldName, asc }: order
) => {
  try {
    const supabase = createClient();

    let query = supabase.from("orders").select(
      `
          *,
          customer:customer_id (name)
      `,
      { count: "exact" }
    );
  if (statusFilter) {
      query = query.eq("status", statusFilter);
    }
    if (fieldName.includes(".")) {
      const [table, field] = fieldName.split(".");

      query = query.order(field, { ascending: asc, referencedTable: table });
    } else if (fieldName) {
      query = query.order(fieldName, { ascending: asc });
    }

    return await query.range(bot, top);
  } catch (error) {
    console.error("#Error getOrdersWithPagination: ", error);
    return {error:true, data:[], count:0};
  }
};

export const getOrdersFilters = async () => {
  try {
    const supabase = createClient();
    const {data:user}=await supabase.auth.getUser()
    const data = await supabase.from("orderfilters").select("status,count").eq('id_user', user?.user?.id);

    return data;
  } catch (error) {
    console.error("#Error getOrdersFilters: ", error);
    return {error:true, data:null,};
  }
};
