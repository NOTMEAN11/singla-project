import db from "@/configs/db";
import { NextResponse } from "next/server";
import z from "zod";

const checkingRoomSchema = z.object({
  room: z.string(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const result = checkingRoomSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const roomType = await db.roomType.findFirst({
    where: {
      id: result.data?.room,
    },
  });

  if (!roomType)
    return NextResponse.json(
      { message: "ไม่พบประเภทห้องพัก", status: "not-found" },
      {
        status: 404,
      }
    );

  const checkAvailableRoom = await db.room.findFirst({
    where: {
      roomTypeId: roomType.id, // Filter by correct room type
      AND: [
        {
          bookings: {
            none: {
              OR: [
                {
                  checkIn: {
                    lte: result.data.checkOutDate,
                  },
                  checkOut: {
                    gte: result.data.checkInDate,
                  },
                },
                {
                  AND: [
                    { checkIn: { gt: result.data.checkOutDate } },
                    { checkOut: { lt: result.data.checkInDate } },
                  ],
                },
              ],
            },
          },
        },
        { status: "available" },
      ],
    },
  });

  if (!checkAvailableRoom) {
    return NextResponse.json(
      { message: "ห้องพักไม่ว่างในช่วงเวลาที่ท่านเลือก", status: "error" },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({
    message: "ห้องพักว่าง",
    status: "success",
  });
}
