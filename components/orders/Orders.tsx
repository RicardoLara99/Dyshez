"use client";
import React, { useEffect, useState } from "react";
import {
  getOrdersFilters,
  getOrdersWithPagination,
} from "@/app/actions/orderActions";
import { sortArrayByField } from "@/lib/utils";
import { Spinner } from "@/lib/icons/Spinner";
import { SelectItemsPerPage } from "./SelectItemsPerPage";
import { Filters } from "./Filters";
import { Pagination } from "./Pagination";
import { TableContent } from "./Table";

interface order {
  id: number;
  customer_id: string;
  mode: string;
  total: number;
  method: string;
  status: string;
  created_at: string;
  customer: {
    name: string;
  };
}
interface filter {
  status: string;
  count: number;
}
interface activeOrder {
  fieldName: string;
  asc: boolean;
}

export const Orders = () => {
  const [orders, setOrders] = useState<order[]>([]);
  const [pagination, setPagination] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<filter[]>([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeOrder, setActiveOrder] = useState<activeOrder>({
    fieldName: "id",
    asc: false,
  });

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const botLimit = pagination * itemsPerPage - 1 + (pagination ? 1 : 0);
      const topLimit = botLimit + itemsPerPage - 1;
      const { data, error, count } = await getOrdersWithPagination(
        botLimit,
        topLimit,
        activeFilter,
        activeOrder
      );

      if (error) {
        setError(
          "Error al obtener la información, vuelve a intentar mas tarde."
        );
        return;
      }
      if (data && data?.length) {
        const filteredData = sortArrayByField(
          data || [],
          activeOrder.fieldName,
          activeOrder.asc ? "asc" : "desc"
        );
        if (filteredData) {
          setOrders(filteredData);
        }
        if (count != totalOrders) {
          setTotalOrders(count || 0);
          getFilters();
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getFilters = async () => {
    const { data, error, ...props } = await getOrdersFilters();

    if (error) {
      setError("Error al obtener los filtros, vuelve a intentar mas tarde.");
      return;
    }
    setFilters(data || []);
  };
  const handleChangeActiveFilter = (status: string) => {
    setActiveFilter(status);
  };

  const handleChangeActiveOrder = (fieldName: string) => {
    if (activeOrder.fieldName === fieldName) {
      setActiveOrder({ fieldName: fieldName, asc: !activeOrder.asc });
    } else {
      setActiveOrder({ fieldName, asc: false });
    }
  };

  const handleChangeItemsPerPage = (newValue: string) => {
    const parseNumber = parseInt(newValue);
    if (parseNumber) {
      return setItemsPerPage(parseNumber);
    }
    return setItemsPerPage(10);
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, activeOrder]);
  useEffect(() => {
    if (!pagination) {
      getOrders();
    } else {
      setPagination(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter, itemsPerPage]);

  return (
    <div className="shadow-login rounded-md lg:m-5">
      <div className="p-6 pt-4 flex gap-3 justify-between align-middle text-center">
        <div className="flex gap-3 justify-start align-middle text-center flex-col md:flex-row">
          <p className="flex items-center m-0 font-semibold ">
            Number of orders
          </p>
          <div className="flex gap-3 items-center">
            <Filters
              filters={filters}
              handleChangeActiveFilter={handleChangeActiveFilter}
            />

            {isLoading && (
              <div className="animate-spin absolute top-0 right-0 p-5 sm:relative sm:p-0">
                <Spinner color="var(--primary)" />
              </div>
            )}
          </div>
        </div>
        <div>
          <SelectItemsPerPage
            itemsPerPage={itemsPerPage + ""}
            handleChangeItemsPerPage={handleChangeItemsPerPage}
          />
        </div>
      </div>
      {
        error && <p className="text-primary pt-4">
          {error}
        </p>
      }
      <div className="min-h-[80vh] max-h-[80vh]">
        <TableContent
          activeOrder={activeOrder}
          orders={orders}
          handleChangeActiveOrder={handleChangeActiveOrder}
        />

        <div>
          <div className="flex justify-center items-center gap-2 pb-4 pt-2">
            <Pagination
              itemsPerPage={itemsPerPage}
              pagination={pagination}
              totalOrders={totalOrders}
              setPagination={setPagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
