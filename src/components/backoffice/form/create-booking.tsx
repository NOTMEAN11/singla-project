"use client";
import React, { use, useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Booking } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { THB, cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { th } from "date-fns/locale/th";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type Props = {
  booking: Booking;
};

type Room = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  roomTypeId: string;
  roomType: RoomType;
};

type RoomType = {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
};

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  checkIn: z.date(),
  checkOut: z.date(),
  adults: z.coerce.number(),
  children: z.coerce.number(),
  isBuffet: z.boolean().optional(),
  isPickup: z.boolean().optional(),
  discountPrice: z.coerce.number(),
  feePrice: z.coerce.number(),
  totalPrice: z.coerce.number().optional(),
  status: z.string(),
  request: z.string().nullable(),
  roomId: z.string(),
});

function CreateBooking() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      checkIn: today,
      checkOut: tomorrow,
      adults: 1,
      children: 0,
      isBuffet: false,
      isPickup: false,
      discountPrice: 0,
      feePrice: 500,
      totalPrice: 0,
      status: "pending",
      request: "",
      roomId: "",
    },
  });
  const status = [
    { name: "ยังไม่ชำระเงิน", value: "pending" },
    { name: "ชำระเงินแล้ว", value: "paid" },
    { name: "ยกเลิก", value: "cancel" },
    { name: "เช็คอิน", value: "checkin" },
    { name: "เช็คเอาท์", value: "checkout" },
  ];
  const [room, setRoom] = useState<Room[]>([]);

  const checkIn = form.watch("checkIn");
  const checkOut = form.watch("checkOut");
  const discountPrice = form.watch("discountPrice");
  const feePrice = form.watch("feePrice");
  const roomId = form.watch("roomId");
  const adults = form.watch("adults");
  const children = form.watch("children");
  const isBuffet = form.watch("isBuffet");
  const isPickup = form.watch("isPickup");

  const buffetPrice = isBuffet ? adults * 199 + children * 99 : 0;
  const pickupPrice = isPickup ? adults * 300 + children * 150 : 0;

  const roomPrice =
    room.find((item) => item.id === roomId)?.roomType.price! || 0;

  const vat = 0.07;
  const calprice = roomPrice + buffetPrice + pickupPrice + feePrice;
  const totalPrice = calprice < 0 ? 0 : calprice * (1 + vat) - discountPrice;

  const checkInDate = new Date(checkIn).setHours(0, 0, 0, 0);
  const checkOutDate = new Date(checkOut).setHours(24, 0, 0, 0);

  async function onSubmit(values: z.infer<typeof schema>) {
    const { totalPrice: _, ...data } = values;
    const res = await fetch(`/api/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        totalPrice,
      }),
    });

    const json = await res.json();

    if (!res.ok) return toast.error(json);

    return toast.success(json.message);
  }

  useEffect(() => {
    fetch(
      `/api/rooms/checking-available?checkIn=${checkInDate}&checkOut=${checkOutDate}`
    )
      .then((res) => res.json())
      .then((data) => setRoom(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 space-y-4 ">
        <div className="col-span-2">
          <div className="space-y-2">
            <h1 className="my-4 text-xl font-bold">ข้อมูลห้องพัก</h1>
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>วันที่เช็คอิน</FormLabel>
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
                              format(field.value, "LLL dd, y", { locale: th })
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      จำนวนวันเข้าพักและวันออกสามารถเปลี่ยนแปลงได้
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>วันที่เช็คเอาท์</FormLabel>
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
                              format(field.value, "LLL dd, y", { locale: th })
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
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>สถานะ</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="เลือกสถานะ" />
                      </SelectTrigger>
                      <SelectContent>
                        {status.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-4">
              <FormField
                control={form.control}
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ห้องพัก</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[300px]">
                          <SelectValue placeholder="เลือกห้องพัก" />
                        </SelectTrigger>
                        <SelectContent>
                          {room.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ผู้ใหญ่</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={`${field.value}`}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="ผู้เข้าพัก" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(10)].map((_, i) => (
                            <SelectItem key={i} value={`${i + 1}`}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เด็ก</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={`${field.value}`}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="ผู้เข้าพัก" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(10)].map((_, i) => (
                            <SelectItem key={i} value={`${i + 1}`}>
                              {i + 1}
                            </SelectItem>
                          ))}
                          <SelectItem value="0">ไม่มี</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="my-4 text-xl font-bold">ข้อมูลผู้เข้าพัก</h1>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ผู้เข้าพัก</FormLabel>
                    <FormControl>
                      <Input placeholder="ผู้เข้าพัก" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อีเมล์</FormLabel>
                    <FormControl>
                      <Input placeholder="example@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>เบอร์โทร</FormLabel>
                    <FormControl>
                      <Input placeholder="0999999999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="request"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>คำขอพิเศษ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="คำขอพิเศษ"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ส่วนลด</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} type="number" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ค่าธรรมเนียม</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} type="number" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ราคาสุทธิ{" "}
                    <span className="text-xs text-gray-500">
                      (ราคาจะอัปเดตอัตโนมัติ)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      {...field}
                      type="number"
                      value={totalPrice.toFixed(2)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <h1 className="text-lg font-bold">ตัวเลือกเพิ่มเติม</h1>
              <FormField
                control={form.control}
                name="isBuffet"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel> บุฟเฟ่ต์เช้า</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPickup"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel> รถรับส่ง</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button className="w-full" type="submit">
          บันทึก
        </Button>
      </form>
    </Form>
  );
}

export default CreateBooking;
