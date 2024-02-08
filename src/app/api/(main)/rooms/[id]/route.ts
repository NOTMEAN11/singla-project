import db from "@/configs/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { roomSchema } from "@/types/rooms";

export async function GET({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { id } = params;
  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const room = await db.room.findUnique({
    where: { id },
  });
  if (!room) return NextResponse.json("ไม่พบข้อมูลห้องพัก", { status: 404 });

  return NextResponse.json(room);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const { id } = params;
  const body = await req.json();
  const result = roomSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const room = await db.room.update({
    where: { id },
    data: {
      name: result.data.name,
      status: result.data.status,
      roomType: {
        connect: { id: result.data.roomTypeId },
      },
    },
  });

  if (!room)
    return NextResponse.json("เกิดข้อผิดพลาดในการแก้ไขห้องพัก", {
      status: 500,
    });

  return NextResponse.json({
    message: "แก้ไขห้องพักสำเร็จ",
    status: "success",
  });
}

export async function DELETE({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const { id } = params;
  const room = await db.room.delete({
    where: { id },
  });

  if (!room)
    return NextResponse.json("เกิดข้อผิดพลาดในการลบห้องพัก", {
      status: 500,
    });

  return NextResponse.json({
    message: "ลบห้องพักสำเร็จ",
    status: "success",
  });
}
