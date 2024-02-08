"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useBookingStore from "@/hooks/usebooking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const bookingSchema = z.object({
  firstName: z.string().min(2, { message: "กรุณากรอกชื่อจริง" }),
  lastName: z.string().min(2, { message: "กรุณากรอกนามสกุล" }),
  email: z.string().email({ message: "กรุณากรอกอีเมล" }),
  phone: z.string().min(10, { message: "กรุณากรอกเบอร์โทรศัพท์" }),
  coupon: z.string().optional(),
  request: z.string().optional(),
});

function BookingForm() {
  const { checkInDate, checkOutDate, room, guest, fee } = useBookingStore();
  const router = useRouter();
  const today = new Date();
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      coupon: "",
      request: "",
    },
  });

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    if (!room || room === null) {
      toast.error("มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง");
      router.push("/booking");
      return;
    }

    if (
      !(checkInDate instanceof Date) ||
      checkInDate.getDate() < today.getDate()
    ) {
      toast.error("โปรดเลือกวันที่เช็คอินใหม่");
      router.push("/booking");
      return;
    }

    let coupon = [
      "1234",
      "12345",
      "123456",
      "1234567",
      "12345678",
      "123456789",
      "1234567890",
    ];

    if (values.coupon && !coupon.includes(values.coupon)) {
      toast.error("ไม่พบรหัสส่วนลด");
      return;
    }

    console.log(values);
    router.push("/booking?step=confirm");
  }

  return (
    <div>
      <h1 className=" font-bold mb-2 text-xl">กรอกข้อมูลของท่าน</h1>
      <div className="bg-gray-300 border border-gray-400 rounded-md p-2 flex items-center space-x-2 mb-2">
        <InfoIcon className="text-gray-500" />
        <p className="text-xs">
          ใกล้เสร็จสมบูรณ์แล้ว! เพียงระบุข้อมูลจำเป็นในช่องที่มีเครื่องหมาย{" "}
          <span className="text-red-500">* </span>
          โปรดระบุข้อมูลของท่านเป็นภาษาไทยหรือภาษาอังกฤษ
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 ">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ชื่อ <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ตัวอย่าง : สมหมาย" {...field} />
                  </FormControl>
                  <FormDescription>
                    กรุณากรอกชื่อนามสกุลตามบัตรประชาชน
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    นามสกุล <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ตัวอย่าง : รวยทอง" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  อีเมล <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="ตัวอย่าง : example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  ข้อมูลยืนยันจะถูกส่งไปยังที่อยู่อีเมลนี้
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2 ">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ตัวอย่าง : 0999999999" {...field} />
                  </FormControl>
                  <FormDescription>
                    สำหรับที่พักเพื่อใช้ติดต่อท่าน
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coupon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    รหัสส่วนลด{" "}
                    <span className="text-xs text-gray-400">(ไม่บังคับ)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="รหัสส่วนลด" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>{" "}
          <FormField
            control={form.control}
            name="request"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h1>
                    คำขอพิเศษ{" "}
                    <span className="text-xs text-gray-400">(ไม่บังคับ)</span>
                  </h1>
                  <p className="text-xs text-gray-400">
                    โปรดระบุคำขอของท่านด้านล่างนี้
                  </p>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  ไม่สามารถรับประกันคำขอพิเศษของท่านได้
                  แต่ที่พักจะดำเนินการอย่างสุดความสามารถเพื่อให้เป็นไปตามความประสงค์ของท่าน
                  โดยท่านสามารถส่งคำขอพิเศษได้เสมอแม้จะดำเนินการจองเรียบร้อยแล้ว
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end">
            <Button className="w-full">ดำเนินการต่อ</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default BookingForm;
