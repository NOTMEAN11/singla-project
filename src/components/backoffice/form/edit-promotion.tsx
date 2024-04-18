"use client";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Promotion } from "@prisma/client";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  slug: z.string(),
});

type Props = {
  data: Promotion;
};

function EditPromotion({ data }: Props) {
  const [assets, setAssets] = useState<{ name: string; path: string }[]>([]);
  const [content, setContent] = useState<string>(data.content);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const res = await fetch(`/api/promotions/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, content }),
    });
    const json = await res.json();
    if (!res.ok) {
      toast.error(json.message);
      return;
    }

    return toast.success("แก้ไขโปรโมชั่นสำเร็จ");
  }
  useEffect(() => {
    fetch("/api/assets/imgpromotions")
      .then((res) => res.json())
      .then((data) => setAssets(data.files));
  }, []);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อโปรโมชั่น</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อโปรโมชั่น" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              const value = field.value;
              return (
                <FormItem>
                  <FormLabel>รูปภาพ</FormLabel>
                  <FormControl>
                    <>
                      <div className="flex items-center space-x-2">
                        {!value && <div>ไม่พบข้อมูล</div>}
                        {value && (
                          <div className="relative w-96 h-96">
                            <Image
                              src={value}
                              layout="fill"
                              alt="promotion image"
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium">เลือกรูปภาพ</p>

                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="เลือกรูปภาพ"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {assets.map((img, idx) => (
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
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Slug" {...field} />
                </FormControl>
                <FormDescription>
                  ใช้สำหรับสร้าง URL ของโปรโมชั่น
                  ต้องเป็นภาษาอังกฤษตัวเล็กเท่านั้น ยกตัวอย่างเช่น test-test
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
          <div className="">
            <h1 className="text-sm font-bold">เนื้อหา</h1>
            <p className="mb-4 text-sm text-gray-400 ">
              กรอกเนื่อได้ที่ฟอร์มด้านล่างนี้
            </p>
            <MDEditor
              value={content}
              onChange={(value) => setContent(value || "")}
              height={500}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
    </div>
  );
}

export default EditPromotion;
