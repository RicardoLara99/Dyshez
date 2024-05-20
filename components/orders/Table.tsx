import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { OrderArrows } from "@/lib/icons/OrderArrows";
import { cn, getDate } from "@/lib/utils";

interface order {
  asc: boolean;
  fieldName: string;
}
interface orders {
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

interface handleChange {
  activeOrder: order;
  handleChangeActiveOrder: (value: string) => void;
  orders: orders[];
}

interface HeadTitle {
  text: string;
  fieldName: string;
  className?: string;
}
export const TableContent = ({
  activeOrder,
  handleChangeActiveOrder,
  orders,
}: handleChange) => {
  const HeadTitle = ({ text, fieldName, className }: HeadTitle) => {
    return (
      <div
        className={cn(
          "flex  align-middle items-center gap-3 cursor-pointer",
          className
        )}
      >
        {text}
        <OrderArrows
          asc={activeOrder.asc}
          active={activeOrder.fieldName === fieldName}
        />
      </div>
    );
  };

  const colorVariants = {
    accepted: "text-primary-accepted bg-primary-accepted-bg",
    rejected: "text-primary-rejected bg-primary-rejected-bg",
    process: "text-primary-process bg-primary-process-bg",
  };
  return (
    <Table className="border-b max-h-[80%]">
      <TableHeader className="sticky -top-0.5 z-10 bg-white">
        <TableRow className="text-table">
          <TableHead
            className=" pl-6 "
            onClick={() => {
              handleChangeActiveOrder("id");
            }}
          >
            <HeadTitle text={"Order ID"} fieldName={"id"} />
          </TableHead>
          <TableHead
            onClick={() => {
              handleChangeActiveOrder("customer.name");
            }}
          >
            <HeadTitle text={"Customer"} fieldName={"customer.name"} />
          </TableHead>
          <TableHead
            onClick={() => {
              handleChangeActiveOrder("created_at");
            }}
          >
            <HeadTitle text={"Date"} fieldName={"created_at"} />
          </TableHead>
          <TableHead
            onClick={() => {
              handleChangeActiveOrder("created_at");
            }}
          >
            <HeadTitle text={"Time"} fieldName={"created_at"} />
          </TableHead>
          <TableHead
            onClick={() => {
              handleChangeActiveOrder("mode");
            }}
          >
            <HeadTitle text={"Mode"} fieldName={"mode"} />
          </TableHead>
          <TableHead
            onClick={() => {
              handleChangeActiveOrder("total");
            }}
          >
            <HeadTitle text={"Total"} fieldName={"total"} />
          </TableHead>
          <TableHead
            onClick={() => {
              handleChangeActiveOrder("method");
            }}
          >
            <HeadTitle text={"Payment Method"} fieldName={"method"} />
          </TableHead>
          <TableHead
            onClick={() => {
              handleChangeActiveOrder("status");
            }}
          >
            <HeadTitle
              text={"Status"}
              fieldName={"status"}
              className=" text-center justify-center"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-table-body">
        {orders.map(
          ({
            id,
            customer,
            mode,
            total,
            method,
            status,
            created_at,
          }: orders) => {
            const [year, day, month] = created_at.split("T")[0].split("-");
            const date = `${day}/${month}/${year}`;
            const hour = getDate(created_at);
            const formatedTotal = !Number.isInteger(total)
              ? total.toFixed(2)
              : total;
            return (
              <TableRow key={id} className="border-b h-[72px]">
                <TableCell className="pl-6">#{id}</TableCell>
                <TableCell className=" max-w-[800px] w-[450px]">
                  {customer.name}
                </TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{hour}</TableCell>
                <TableCell>{mode}</TableCell>
                <TableCell>${formatedTotal}</TableCell>
                <TableCell>{method}</TableCell>
                <TableCell className={`text-center`}>
                  <p
                    className={`text-center text-primary-${status.toLowerCase()} bg-primary-${status.toLowerCase()}-bg rounded-full px-3 py-1`}
                  >
                    {status}
                  </p>
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};
