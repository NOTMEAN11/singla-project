"use client";
import React, { useEffect, useState } from "react";
import { Coupon } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CalendarIcon, Edit2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { th } from "date-fns/locale/th";
import { toast } from "sonner";

const schema = z.object({
  code: z.string(),
  discount: z.coerce.number(),
  description: z.string(),
  total: z.coerce.number(),
  endDate: z.date().optional(),
});

type Props = {
  data: Coupon;
  id: string;
};

function EditCouponDialog({ data, id }: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof schema>) {
    const res = await fetch(`/api/promotions/coupon/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        endDate: new Date(values.endDate!),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message);
    }

    return toast.success(data.message);
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Edit2 size={14} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขรหัสคูปอง {data.code}</DialogTitle>
          <DialogDescription>โดยกรอกข้อมูลด้านล่าง</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รหัสคูปอง</FormLabel>
                  <FormControl>
                    <Input placeholder="CODE" {...field} />
                  </FormControl>
                  <FormDescription>
                    นี่คือรหัสคูปองที่ลูกค้าจะใช้ในการรับส่วนลด
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>คำอธิบาย</FormLabel>
                  <FormControl>
                    <Input placeholder="คำอธิบาย" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ส่วนลด</FormLabel>
                  <FormControl>
                    <Input placeholder="ส่วนลด" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>จำนวนคงเหลือ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="จำนวนคงเหลือ"
                      {...field}
                      type="number"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>วันที่หมดอายุ</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: th })
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        // disabled={(date) =>
                        //   date > new Date() || date < new Date("1900-01-01")
                        // }
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCouponDialog;
