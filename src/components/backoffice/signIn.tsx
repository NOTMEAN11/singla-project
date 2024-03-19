"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "../ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const SignInSchema = z.object({
  email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
  password: z
    .string()
    .min(4, { message: "รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร" })
    .max(100, { message: "รหัสผ่านต้องมีไม่เกิน 100 ตัวอักษร" }),
});

function SignIn() {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignInSchema>) {
    signIn("credentials", {
      email: values.email,
      password: values.password,
    });

    redirect("/backoffice");
  }
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>เข้าสู่ระบบ</CardTitle>
        <CardDescription>
          คุณจะต้องเข้าสู่ระบบเพื่อเข้าใช้งาน หากมีปัญหาให้ติดต่อผู้ดูแลระบบ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="อีเมล" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="รหัสผ่าน" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              เข้าสู่ระบบ
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignIn;
