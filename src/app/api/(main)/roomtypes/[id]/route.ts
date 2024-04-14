import db from "@/configs/db";
import { authOptions } from "@/lib/auth";
import { roomTypeSchema } from "@/types/room-type";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const room = await db.roomType.findUnique({
    where: { id },
  });

  if (!room) return NextResponse.json("ไม่พบข้อมูลห้องพัก", { status: 404 });

  return NextResponse.json(room);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const sesstion = await getServerSession(authOptions);
  if (!sesstion) return NextResponse.json("Unauthorized", { status: 401 });

  const { id } = params;
  const body = await req.json();
  const result = roomTypeSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const room = await db.roomType.update({
    where: { id },
    data: {
      name: result.data.name,
      description: result.data.description,
      price: result.data.price,
      capacity: result.data.capacity,
      image: result.data.image,
    },
  });

  if (!room)
    return NextResponse.json("เกิดข้อผิดพลาดในการสร้างห้องพัก", {
      status: 500,
    });

  return NextResponse.json({
    message: "แก้ไขห้องพักสำเร็จ",
    status: "success",
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const sesstion = await getServerSession(authOptions);
  if (!sesstion) return NextResponse.json("Unauthorized", { status: 401 });

  const { id } = params;
  const room = await db.roomType.delete({
    where: { id },
  });

  if (!room) return NextResponse.json("ไม่พบข้อมูลห้องพัก", { status: 404 });

  return NextResponse.json({
    message: "ลบห้องพักสำเร็จ",
    status: "success",
  });
}
