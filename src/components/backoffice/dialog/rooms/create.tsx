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
import { Edit2, Plus } from "lucide-react";
import { Room, RoomType } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const schema = z.object({
  name: z.string(),
  status: z.string(),
  roomTypeId: z.string(),
});

function CreateRoomDialog() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      status: "",
      roomTypeId: "",
    },
  });

  const [roomType, setRoomType] = React.useState<RoomType[]>([]);

  async function onSubmit(values: z.infer<typeof schema>) {
    const res = await fetch(`/api/rooms`, {
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

  const status = [
    { name: "ว่าง", value: "available" },
    { name: "ทำความสะอาด", value: "housekeeping" },
    { name: "ซ่อมบำรุง", value: "maintenance" },
    { name: "ไม่ระบุ", value: "unspecified" },
  ];

  useEffect(() => {
    fetch("/api/roomtypes")
      .then((res) => res.json())
      .then((data) => setRoomType(data));
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus size={14} className="mr-2" />
          สร้างห้องพักใหม่
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> สร้างห้องพักใหม่</DialogTitle>
          <DialogDescription>
            ท่านกำลังสร้างห้องพักใหม่ กรุณากรอกข้อมูลให้ครบถ้วน และถูกต้อง
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>หมายเลขห้อง</FormLabel>
                    <FormControl>
                      <Input placeholder="หมายเลขห้อง" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกสถานะห้องพัก" />
                          </SelectTrigger>
                        </FormControl>
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
              <FormField
                control={form.control}
                name="roomTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ประเภทห้อง</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภทห้องพัก" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roomType.map((item) => (
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

export default CreateRoomDialog;
