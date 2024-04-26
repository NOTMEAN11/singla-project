import db from "@/configs/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { couponSchema } from "@/types/promotion";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const coupon = await db.coupon.findUnique({
    where: { code: id },
  });

  if (!coupon)
    return NextResponse.json({ message: "ไม่พบข้อมูลคูปอง", status: 404 });

  return NextResponse.json(coupon);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (session) {
    const body = await req.json();
    const result = couponSchema.safeParse(body);

    if (!result.success)
      return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

    const coupon = await db.coupon.update({
      where: { id: params.id },
      data: {
        ...result.data,
      },
    });

    if (!coupon)
      return NextResponse.json("เกิดข้อผิดพลาดในการอัพเดทคูปอง", {
        status: 500,
      });

    return NextResponse.json({
      message: "อัพเดทคูปองสำเร็จ",
      status: "success",
    });
  }

  const coupon = await db.coupon.findUnique({
    where: { id: params.id },
  });

  if (!coupon) return NextResponse.json("ไม่พบข้อมูลคูปอง", { status: 404 });

  const totalCoupon = coupon.total === 0 ? 0 : coupon.total - 1;

  const update = await db.coupon.update({
    where: { id: params.id },
    data: {
      total: totalCoupon,
    },
  });

  if (!update)
    return NextResponse.json("เกิดข้อผิดพลาดในการใช้คูปอง", { status: 500 });

  return NextResponse.json({
    message: "ใช้คูปองสำเร็จ",
    status: "success",
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const coupon = await db.coupon.delete({
    where: { id },
  });

  if (!coupon)
    return NextResponse.json("เกิดข้อผิดพลาดในการลบคูปอง", { status: 500 });

  return NextResponse.json({
    message: "ลบคูปองสำเร็จ",
    status: "success",
  });
}
