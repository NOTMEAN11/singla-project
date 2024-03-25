import db from "@/configs/db";
import { authOptions } from "@/lib/auth";
import { hashPassword } from "@/lib/hash";
import { adminSchema } from "@/types/admin";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  res: NextResponse,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  const { id } = params;
  const body = await req.json();
  const result = adminSchema.safeParse(body);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

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
    return NextResponse.json("เกิดข้อผิดพลาดในการอัพเดทบัญชีผู้ดูแลระบบ", {
      status: 500,
    });

  return NextResponse.json({
    message: "อัพเดทบัญชีผู้ดูแลระบบสำเร็จ",
    status: "success",
  });
}

export async function DELETE(
  req: Request,
  res: NextResponse,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });
  const data = await db.admin.findUnique({
    where: { id },
  });

  if (!data)
    return NextResponse.json("ไม่พบข้อมูลผู้ดูแลระบบ", { status: 404 });

  const admin = await db.admin.delete({
    where: { id },
  });

  if (!admin)
    return NextResponse.json("เกิดข้อผิดพลาดในการลบบัญชีผู้ดูแลระบบ", {
      status: 500,
    });

  return NextResponse.json({
    message: "ลบบัญชีผู้ดูแลระบบสำเร็จ",
    status: "success",
  });
}
