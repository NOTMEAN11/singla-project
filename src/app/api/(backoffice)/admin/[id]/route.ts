import db from "@/configs/db";
import { hashPassword } from "@/lib/hash";
import { adminSchema } from "@/types/admin";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const result = adminSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const data = await db.admin.findUnique({
    where: { id },
  });

  if (!data)
    return NextResponse.json("ไม่พบข้อมูลผู้ดูแลระบบ", { status: 404 });

  const password = await hashPassword(result.data.password);

  const admin = await db.admin.update({
    where: { id },
    data: {
      name: result.data.name,
      email: result.data.email,
      password,
    },
  });

  if (!admin)
    return {
      status: 500,
      body: "เกิดข้อผิดพลาดในการอัพเดทบัญชีผู้ดูแลระบบ",
    };

  return {
    status: 200,
    body: {
      message: "อัพเดทบัญชีผู้ดูแลระบบสำเร็จ",
      status: "success",
    },
  };
}

export async function DELETE({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await db.admin.findUnique({
    where: { id },
  });

  if (!data)
    return NextResponse.json("ไม่พบข้อมูลผู้ดูแลระบบ", { status: 404 });

  const admin = await db.admin.delete({
    where: { id },
  });

  if (!admin)
    return {
      status: 500,
      body: "เกิดข้อผิดพลาดในการลบบัญชีผู้ดูแลระบบ",
    };

  return {
    status: 200,
    body: {
      message: "ลบบัญชีผู้ดูแลระบบสำเร็จ",
      status: "success",
    },
  };
}
