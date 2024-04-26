import db from "@/configs/db";
import { authOptions } from "@/lib/auth";
import { roomTypeSchema } from "@/types/room-type";
import { format } from "date-fns";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const includeRoom = searchParams.get("room") === "true" ? true : false;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const checkInDate = new Date(Number(checkIn!));
  const checkOutDate = new Date(Number(checkOut!));

  const type = searchParams.get("type");

  if (!checkIn || !checkOut) {
    const rooms = await db.roomType.findMany({
      include: {
        rooms: includeRoom,
      },
      orderBy: {
        price: "asc",
      },
    });
    return NextResponse.json(rooms);
  }

  const roomType = await db.roomType.findUnique({
    where: { id: type! },
  });

  if (!roomType)
    return NextResponse.json(
      { message: "ไม่พบประเภทห้องพัก", status: "not-found" },
      { status: 404 }
    );

  const checkAvailableRoom = await db.room.findMany({
    where: {
      roomTypeId: roomType.id, // Filter by correct room type
      AND: [
        {
          bookings: {
            none: {
              OR: [
                {
                  checkIn: {
                    lt: checkOutDate,
                  },
                  checkOut: {
                    gt: checkInDate,
                  },
                },
                {
                  AND: [
                    { checkIn: { gt: checkInDate } },
                    { checkOut: { lt: checkOutDate } },
                  ],
                },
              ],
            },
          },
        },
        { status: "available" },
      ],
    },
    include: {
      roomType: true,
    },
  });

  return NextResponse.json(checkAvailableRoom);
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
      slug: result.data.slug,
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
