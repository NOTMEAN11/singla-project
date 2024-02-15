import db from "@/configs/db";
import { authOptions } from "@/lib/auth";
import { promotionSchema } from "@/types/promotion";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const promotions = await db.promotion.findMany();
  return NextResponse.json(promotions);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });
  const body = await req.json();
  const result = promotionSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const promotion = await db.promotion.create({
    data: {
      name: result.data.name,
      image: result.data.image,
      description: result.data.description,
      content: result.data.content,
      slug: result.data.slug,
    },
  });

  if (!promotion)
    return NextResponse.json("เกิดข้อผิดพลาดในการสร้างโปรโมชั่น", {
      status: 500,
    });

  return NextResponse.json({
    message: "สร้างโปรโมชั่นสำเร็จ",
    status: "success",
  });
}
