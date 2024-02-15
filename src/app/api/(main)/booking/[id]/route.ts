import db from "@/configs/db";
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
