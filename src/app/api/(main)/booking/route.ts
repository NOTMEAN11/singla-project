import db from "@/configs/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { bookingSchema } from "@/types/booking";

import { Resend } from "resend";
import SinglaBooking from "../../../../../emails";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const bookings = await db.booking.findMany();

  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = bookingSchema.safeParse(body);

  if (!result.success)
    // return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });
    return NextResponse.json(result.error, { status: 400 });

  const { roomId: _, ...rest } = result.data;

  const roomType = await db.roomType.findFirst({
    where: {
      id: result.data.roomTypeId,
    },
  });

  if (!roomType)
    return NextResponse.json(
      { message: "ไม่พบประเภทห้องพัก", status: "not-found" },
      {
        status: 404,
      }
    );

  const room = await db.room.findFirst({
    where: {
      roomTypeId: result.data.roomTypeId,
      status: "available",
    },
  });

  if (!room)
    return NextResponse.json(
      { message: "ไม่พบห้องพักที่ว่าง กรุณาทำรายการใหม่", status: "not-found" },
      {
        status: 404,
      }
    );

  const update_room = await db.room.update({
    where: {
      id: room?.id,
    },
    data: {
      status: "unavailable",
    },
  });

  const booking = await db.booking.create({
    data: {
      ...rest,
      room: {
        connect: {
          id: room?.id,
        },
      },
    },
  });

  if (!booking)
    return NextResponse.json("เกิดข้อผิดพลาดในการสร้างการจอง", {
      status: 500,
    });

  const { data, error } = await resend.emails.send({
    from: "noreply@singlaresort.com",
    to: result.data.email,
    subject: "ชำระเงินเพื่อยืนยันการจองห้องพัก Singla Resort",
    react: SinglaBooking({
      title: "ชำระเงินเพื่อยืนยันการจอง",
      bookingId: booking.id,
      totalGuest: { adult: result.data.adults, child: result.data.children },
      discount: result.data.discountPrice,
      name: result.data.name,
      roomType: roomType?.name,
      checkIn: format(new Date(result.data.checkIn), "dd/MM/yyyy", {
        locale: th,
      }),
      checkOut: format(new Date(result.data.checkOut), "dd/MM/yyyy", {
        locale: th,
      }),
      userEmail: result.data.email,
      total: result.data.totalPrice,
      link: `http://localhost:3000/payment/inform-payment/${booking.id}`,
    }),
  });

  return NextResponse.json({
    resend: { data, error },
    message: "สร้างการจองสำเร็จ",
    status: "success",
  });
}
