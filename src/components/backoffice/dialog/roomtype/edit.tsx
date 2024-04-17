"use client";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Edit2, BedDouble, X } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import { THB } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  capacity: z.coerce.number(),
  image: z.array(z.string()),
  slug: z.string(),
});

type Props = {
  data: {
    name: string;
    description: string;
    price: number;
    capacity: number;
    image: string[];
    slug: string;
  };
  id: string;
};

function EditRoomTypeDialog({ data, id }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
    },
  });
  const [assets, setAssets] = useState<{ name: string; path: string }[]>([]);
  const [images, setImages] = useState<string[]>(data.image);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof schema>) {
    const res = await fetch(`/api/roomtypes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (data.status === "success") {
      toast.success(data.message);
    }

    if (data.status === 500) {
      toast.error(data.message);
    }

    return;
  }

  useEffect(() => {
    fetch("/api/assets/rooms")
      .then((res) => res.json())
      .then((data) => setAssets(data.files));
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Edit2 size={14} className="text-yellow-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BedDouble className="mr-2" />
            แก้ไขประเภทห้องพัก
          </DialogTitle>
          <DialogDescription>
            คุณสามารถเพิ่มหรือลบรูปภาพได้ และกดบันทึกเมื่อเสร็จสิ้น
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 text-xs"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อประเภทห้องพัก</FormLabel>
                  <FormControl>
                    <Input placeholder={data.name} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ราคา</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={THB(data.price)}
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
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ความจุผู้พัก</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`${data.capacity}`}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>คำอธิบาย</FormLabel>
                  <FormControl>
                    <Textarea placeholder={data.description} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder={data.slug} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => {
                const imgs = assets.filter((img) => !images.includes(img.name));
                const value = field.value;
                return (
                  <FormItem>
                    <FormLabel>รูปภาพ</FormLabel>
                    <FormControl>
                      <>
                        <div className="flex items-center space-x-2">
                          {value.length === 0 && (
                            <div className="w-full p-4 text-center">
                              ไม่พบข้อมูล
                            </div>
                          )}
                          {value.map((img, idx) => (
                            <div key={idx} className="relative">
                              <div
                                className="absolute top-0 right-0 bg-red-500 rounded-full"
                                onClick={() => {
                                  const newImages = value.filter(
                                    (image) => image !== img
                                  );
                                  field.onChange(newImages);
                                }}
                              >
                                <X
                                  size={14}
                                  className="text-white cursor-pointer "
                                />
                              </div>

                              <Image
                                src={img}
                                alt={img}
                                width={150}
                                height={150}
                                className="p-1 border border-dashed rounded-md aspect-video"
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-sm font-medium">เพิ่มรูปภาพ</p>
                        <p className="text-xs text-gray-500">
                          คุณสามารถเพิ่มได้หลายรูปภาพ
                        </p>
                        <Select
                          onValueChange={(value) => {
                            field.onChange([...field.value, value]);
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="เลือกรูปภาพ"></SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {imgs.map((img, idx) => (
                              <SelectItem
                                key={idx}
                                value={img.path}
                                // className="flex items-center justify-center"
                              >
                                {img.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="space-x-2">
              <Button type="submit">ยืนยัน</Button>
              <div
                className={buttonVariants({
                  className: "cursor-pointer",
                })}
                onClick={() => form.reset()}
              >
                รีเซ็ต
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditRoomTypeDialog;
