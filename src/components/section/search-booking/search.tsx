"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { THB, cn, formatPhoneNumber } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";

type Props = {
  bookingId?: string;
};

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  isBuffet: boolean;
  isPickup: boolean;
  discountPrice: number;
  feePrice: number;
  totalPrice: number;
  status: string;
  request: string;
  createdAt: string;
  updatedAt: string;
  roomId: string;
};

const formSchema = z.object({
  bookingId: z.string().min(1, "กรุณากรอกหมายเลขที่จอง"),
});

function SearchBookingSection({ bookingId }: Props) {
  const status_text =
    "pending" ||
    "checkIn" ||
    "checkOut" ||
    "unpaid" ||
    "paid" ||
    "cancel" ||
    "noShow";

  function statusStyle(status: string) {
    switch (status) {
      case "pending":
        return "text-yellow-500";
      case "checkIn":
        return "text-green-500";
      case "checkOut":
        return "text-red-500";
      case "unpaid":
        return "text-yellow-500";
      case "paid":
        return "text-green-500";
      case "cancel":
        return "text-red-500";
      case "noShow":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  }

  function txtStatus(status: string) {
    switch (status) {
      case "pending":
        return "รอการชำระเงิน";
      case "checkIn":
        return "เข้าพัก";
      case "checkOut":
        return "ออกจากที่พัก";
      case "unpaid":
        return "ยังไม่ได้ชำระเงิน";
      case "paid":
        return "ชำระเงินแล้ว";
      case "cancel":
        return "ยกเลิกการจอง";
      case "noShow":
        return "ไม่มาเข้าพัก";
      default:
        return "ไม่พบสถานะ";
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingId: bookingId ? bookingId : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch(`/api/booking/${values.bookingId}`);
    const booking = await res.json();

    if (!res.ok) {
      return toast.error(booking.message);
    }

    return setData(booking);
  }
  const [data, setData] = useState<Booking>();

  useEffect(() => {
    async function getBookingId(id: string) {
      const res = await fetch(`/api/booking/${id}`);
      const booking = await res.json();
      if (!res.ok) {
        return toast.error(booking.message);
      }
      return setData(booking);
    }
    if (bookingId) getBookingId(bookingId);
  }, [bookingId]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl mx-auto"
        >
          <FormField
            control={form.control}
            name="bookingId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={bookingId ? bookingId : "หมายเลขที่จอง"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4">
            ค้นหา
          </Button>
        </form>
      </Form>
      <div className="flex items-center justify-center mt-12">
        {data ? (
          <div className="w-full max-w-xl p-4 bg-gray-200 border rounded-md">
            <div className="grid grid-cols-3 mb-2 text-xs">
              <h1 className="font-bold">หมายเลขที่จอง</h1>
              <p className="col-span-2">{data.id}</p>
            </div>
            <div className="grid grid-cols-3 text-xs">
              <h1 className="font-bold">ชื่อ</h1>
              <p className="col-span-2">{data.name}</p>
            </div>
            <div className="grid grid-cols-3 text-xs">
              <h1 className="font-bold">อีเมล</h1>
              <p className="col-span-2">{data.email}</p>
            </div>
            <div className="grid grid-cols-3 text-xs">
              <h1 className="font-bold">เบอร์โทร</h1>
              <p className="col-span-2">{formatPhoneNumber(data.phone)}</p>
            </div>
            <div className="grid grid-cols-3 text-xs">
              <h1 className="font-bold">เช็คอิน - เช็คเอ้าท์</h1>
              <p className="col-span-2">
                {format(data.checkIn, "dd MMM yyyy", { locale: th })} -{" "}
                {format(data.checkOut, "dd MMM yyyy", { locale: th })}
              </p>
            </div>
            <div className="grid grid-cols-3 text-xs">
              <h1 className="font-bold">ผู้เข้าพัก</h1>
              <p className="col-span-2">
                ผู้ใหญ่ {data.adults} คน , เด็ก {data.children} คน
              </p>
            </div>
            <div className="grid grid-cols-3 text-xs">
              <h1 className="font-bold">ราคา</h1>
              <p className="col-span-2">{THB(data.totalPrice)}</p>
            </div>
            <div className="grid grid-cols-3 text-xs">
              <h1 className="font-bold">สถานะ</h1>
              <p className={cn("col-span-2", statusStyle(data.status))}>
                {txtStatus(data.status)}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-64"></div>
        )}
      </div>
    </div>
  );
}

export default SearchBookingSection;
