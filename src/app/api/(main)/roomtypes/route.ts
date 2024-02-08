import db from "@/configs/db";
import { authOptions } from "@/lib/auth";
import { roomTypeSchema } from "@/types/room-type";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const rooms = await db.roomType.findMany();
  return rooms;
}

export async function POST(req: Request) {
  const sesstion = await getServerSession(authOptions);
  if (!sesstion) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const result = roomTypeSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const room = await db.roomType.create({
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
    message: "สร้างห้องพักสำเร็จ",
    status: "success",
  });
}
