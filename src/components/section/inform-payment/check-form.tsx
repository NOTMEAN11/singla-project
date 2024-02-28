"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import db from "@/configs/db";
import { toast } from "sonner";

const paymentSchema = z.object({
  bookingId: z.string().min(1, "กรุณากรอกหมายเลขที่จอง"),
});

function InformCheck() {
  const router = useRouter();
  const path = usePathname();
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    disabled: path !== "/payment/inform-payment",
  });

  async function onSubmit(value: z.infer<typeof paymentSchema>) {
    const res = await fetch(`/api/booking/${value.bookingId}`);
    const data = await res.json();
    if (!res.ok) {
      toast.error("ไม่พบหมายเลขที่จอง");
      return;
    }

    return router.push(`/payment/inform-payment/${value.bookingId}`);
  }
  const id = path.split("/").pop();

  return (
    <div className="p-4 border rounded-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="bookingId"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>
                  หมายเลขที่จอง <span className="text-red-500">*</span>
                </FormLabel>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input
                      placeholder={
                        path === "/payment/inform-payment"
                          ? "กรอกหมายเลขที่จอง"
                          : `${id}`
                      }
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    disabled={path !== "/payment/inform-payment"}
                  >
                    ตรวจสอบ
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default InformCheck;
