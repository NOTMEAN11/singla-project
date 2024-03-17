import { writeFile, rename } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import SinglaPaid from "../../../../../emails/paid";
import { Booking } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);

async function slipsUpload(file: File, booking: Booking) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `./public/slips/${booking.id + " - " + file.name}`;

  await writeFile(path, buffer);
}

async function verifySlip(file: File, amount: number, booking: Booking) {
  const formData = new FormData();
  formData.set("files", file);

  const res = await fetch("https://api.slipok.com/api/line/apikey/15589", {
    method: "POST",
    headers: {
      "x-authorization": "SLIPOK3RACKLT",
    },
    body: formData,
  });

  const slip = await res.json();
  console.log(slip);

  if (!slip.data.success) {
    return {
      message: "ข้อมูลไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง",
      status: "error",
    };
  }

  if (slip.data.amount !== amount) {
    return {
      message: "จำนวนเงินไม่ตรงกับที่โอน",
      status: "error",
      amount: slip.data.amount,
    };
  }

  if (slip.data.receiver.name !== "THANABOON T")
    return {
      message: "ชื่อผู้รับเงินไม่ตรงกับที่โอน",
      status: "error",
    };

  const { data: email, error } = await resend.emails.send({
    from: "noreply@singlaresort.com",
    to: booking.email,
    subject: "ชำระเงินสำเร็จ",
    react: SinglaPaid({
      name: booking.name,
      title: "ชำระเงินค่าห้องพักสำเร็จ",
      text: "ระบบได้ทำการจองห้องพักของท่านเรียบร้อยแล้ว ขอขอบคุณที่ท่านได้เลือกที่พักกับเรา",
      userEmail: booking.email,
      link: `http://localhost:3000/payment/search-booking?bookigId=${booking.id}`,
    }),
  });

  return {
    message: "ทำรายการสำเร็จ",
    status: "success",
  };
}

export async function POST(request: NextRequest) {
  const thb = request.headers.get("x-amount");
  const bookingId = request.headers.get("x-booking-id");

  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const amount = Number(thb);

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId as string,
    },
  });

  if (booking?.status !== "pending")
    return NextResponse.json(
      { message: "ไม่สามารถทำรายการได้", status: "error" },
      { status: 400 }
    );

  if (!booking)
    return NextResponse.json(
      { message: "ไม่พบหมายเลขที่จอง", status: "not-found" },
      { status: 404 }
    );

  if (!file) {
    return NextResponse.json(
      { message: "ไม่พบไฟล์ที่อัพโหลด", status: "error" },
      { status: 400 }
    );
  }

  const verify = await verifySlip(file, amount, booking);

  await slipsUpload(file, booking);
  await db.booking.update({
    where: {
      id: bookingId as string,
    },
    data: {
      status: "paid",
    },
  });

  return NextResponse.json(verify);
}
