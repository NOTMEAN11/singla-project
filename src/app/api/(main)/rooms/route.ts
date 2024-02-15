import db from "@/configs/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { roomSchema } from "@/types/rooms";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const rooms = await db.room.findMany();
  return NextResponse.json(rooms);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const result = roomSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const room = await db.room.create({
    data: {
      name: result.data.name,
      status: result.data.status,
      roomType: {
        connect: { id: result.data.roomTypeId },
      },
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
