import db from "@/configs/db";
import { bookingSchema } from "@/types/booking";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const booking = await db.booking.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!booking)
    return NextResponse.json(
      { message: "ไม่พบหมายเลขที่จอง", status: "not-found" },
      { status: 404 }
    );

  return NextResponse.json(booking);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const result = bookingSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const booking = await db.booking.update({
    where: {
      id: params.id,
    },
    data: result.data,
  });

  if (!booking)
    return NextResponse.json(
      { message: "ไม่พบหมายเลขที่จอง", status: "not-found" },
      { status: 404 }
    );

  return NextResponse.json({ message: "แก้ไขข้อมูลสำเร็จ" });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const booking = await db.booking.delete({
    where: {
      id: params.id,
    },
  });

  if (!booking)
    return NextResponse.json(
      { message: "ไม่พบหมายเลขที่จอง", status: "not-found" },
      { status: 404 }
    );

  return NextResponse.json({ message: "ลบข้อมูลสำเร็จ" });
}
