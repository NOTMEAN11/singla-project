"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast } from "sonner";

const schema = z.object({
  name: z.string(),
});

function CreateFolder() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof schema>) {
    const res = await fetch("/api/assets?type=folder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: values.name }),
    });
    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message);
    }

    return toast.success(data.message);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center">
          <Plus size={14} className="mr-2" />
          สร้างโฟลเดอร์ใหม่
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> สร้างโฟลเดอร์ใหม่</DialogTitle>
          <DialogDescription>
            ท่านกำลังสร้างโฟลเดอร์ใหม่ กรุณากรอกข้อมูลให้ครบถ้วน
            และถูกต้องหลังจากนั้นทำการรีเฟรชหน้าเพื่อดูการเปลี่ยนแปลง
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ชื่อโฟล์เดอร์</FormLabel>
                    <FormControl>
                      <Input placeholder="Newfolder" {...field} />
                    </FormControl>
                    <FormDescription>
                      ชื่อโฟล์เดอร์ที่ต้องการสร้าง
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFolder;
