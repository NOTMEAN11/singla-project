import db from "@/configs/db";
import { authOptions } from "@/lib/auth";
import { promotionSchema } from "@/types/promotion";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  res: Response,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await db.promotion.findUnique({
    where: { id },
  });

  if (!data) return NextResponse.json("ไม่พบข้อมูลโปรโมชั่น", { status: 404 });

  return NextResponse.json(data);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();
  const result = promotionSchema.safeParse(body);

  if (!result.success)
    return NextResponse.json("กรอกข้อมูลให้ครบถ้วน", { status: 400 });

  const promotion = await db.promotion.update({
    where: { id },
    data: {
      name: result.data.name,
      image: result.data.image,
      description: result.data.description,
      content: result.data.content,
      slug: result.data.slug,
    },
  });

  if (!promotion)
    return NextResponse.json("เกิดข้อผิดพลาดในการแก้ไขโปรโมชั่น", {
      status: 500,
    });

  return NextResponse.json({
    message: "แก้ไขโปรโมชั่นสำเร็จ",
    status: "success",
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  const data = await db.promotion.findUnique({
    where: { id },
  });

  if (!data) return NextResponse.json("ไม่พบข้อมูลโปรโมชั่น", { status: 404 });

  const promotion = await db.promotion.delete({
    where: { id },
  });

  if (!promotion)
    return NextResponse.json("เกิดข้อผิดพลาดในการลบโปรโมชั่น", {
      status: 500,
    });

  return NextResponse.json({
    message: "ลบโปรโมชั่นสำเร็จ",
    status: "success",
  });
}
