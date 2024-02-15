import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import db from "@/configs/db";
import { NextResponse } from "next/server";

export async function GET() {
  const coupon = await db.coupon.findMany();

  return NextResponse.json(coupon);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const coupon = await db.coupon.create({
    data: {
      ...body,
    },
  });

  if (!coupon)
    return NextResponse.json("เกิดข้อผิดพลาดในการสร้างคูปอง", {
      status: 500,
    });

  return NextResponse.json({
    message: "สร้างคูปองสำเร็จ",
    status: "success",
  });
}
