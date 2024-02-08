import db from "@/configs/db";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/hash";
import { adminSchema } from "@/types/admin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const admins = await db.admin.findMany();
  return NextResponse.json(admins);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const result = adminSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const password = await hashPassword(result.data.password);
  const admin = await db.admin.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      password: password,
    },
  });

  if (!admin)
    return NextResponse.json("เกิดข้อผิดพลาดในการสร้างบัญชีผู้ดูแลระบบ", {
      status: 500,
    });

  return NextResponse.json({
    message: "สร้างบัญชีผู้ดูแลระบบสำเร็จ",
    status: "success",
  });
}
