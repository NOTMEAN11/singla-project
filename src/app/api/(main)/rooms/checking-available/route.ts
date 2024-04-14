import db from "@/configs/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export async function GET(req: NextRequest) {
  //   const session = await getServerSession(authOptions);
  const searchParams = req.nextUrl.searchParams;
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");

  if (!checkIn || !checkOut)
    return NextResponse.json("Check in and check out date is required", {
      status: 400,
    });

  const checkInDate = new Date(Number(checkIn));
  const checkOutDate = new Date(Number(checkOut));

  //   if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const checkAvailableRoom = await db.room.findMany({
    where: {
      AND: [
        {
          bookings: {
            none: {
              OR: [
                {
                  checkIn: {
                    lte: checkOutDate,
                  },
                  checkOut: {
                    gte: checkInDate,
                  },
                },
                {
                  AND: [
                    { checkIn: { gt: checkOutDate } },
                    { checkOut: { lt: checkInDate } },
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
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(checkAvailableRoom);
}
