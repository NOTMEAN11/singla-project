"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { th } from "date-fns/locale/th";

const schema = z.object({
  code: z.string(),
  discount: z.coerce.number(),
  description: z.string(),
  total: z.coerce.number(),
  endDate: z.date().optional(),
});

function CreateCouponDialog() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: "",
      discount: 0,
      description: "",
      total: 0,
      endDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const res = await fetch(`/api/promotions/coupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message);
    }

    toast.success(data.message);
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus size={14} className="mr-2" />
          สร้างคูปองใหม่
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> สร้างคูปองใหม่</DialogTitle>
          <DialogDescription>
            ท่านกำลังสร้างคูปองใหม่ กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้อง
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>รหัสคูปอง</FormLabel>
                    <FormControl>
                      <Input placeholder="รหัสคูปอง" {...field} />
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
                      <Input placeholder="ส่วนลด" {...field} />
                    </FormControl>
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
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>จำนวนคูปอง</FormLabel>
                    <FormControl>
                      <Input placeholder="จำนวนคูปอง" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
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

              <Button type="submit">บันทึก</Button>
              <div
                className={buttonVariants({
                  className: "cursor-pointer ml-1",
                })}
                onClick={() => form.reset()}
              >
                รีเซ็ต
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCouponDialog;
