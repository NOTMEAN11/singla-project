import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { writeFile } from "fs/promises";

export async function GET(
  req: NextRequest,
  { params }: { params: { dir: string } }
) {
  // find all images in the directory
  try {
    const path = process.cwd() + "/public/assets/" + params.dir;
    const file = fs.readdirSync(path);
    const files = file.map((file) => ({
      name: file,
      path: `/assets/${params.dir}/${file}`,
    }));
    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json({
      message: "No images found",
      error: error,
      status: "not-found",
    });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { dir: string } }
) {
  // upload image to the directory
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;
  const formData = new FormData();
  formData.set("files", file);

  if (!file) {
    return NextResponse.json({
      message: "No file found",
      status: "error",
    });
  }

  const findDir = fs.readdirSync(process.cwd() + "/public/assets");
  const dir = findDir.find((dir) => dir === params.dir);
  if (!dir) {
    return NextResponse.json({
      message: "ไม่พบโฟล์เดอร์ที่ต้องการอัพโหลด",
      status: "error",
    });
  }

  const path = process.cwd() + "/public/assets/" + params.dir + "/" + file.name;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(path + file.name, buffer);
    return NextResponse.json({
      message: "อัปโหลดไฟล์สำเร็จแล้ว",
      status: "success",
    });
  } catch (error) {
    return NextResponse.json({
      message: "ไม่สามารถอัปโหลดไฟล์ได้ โปรดลองใหม่อีกครั้ง",
      status: "error",
      error: error,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { dir: string } }
) {
  // delete image from the directory

  const data = await req.json();

  const { name } = data;
  const path =
    __dirname +
    "../../../../../../../../public/assets/" +
    params.dir +
    "/" +
    name;
  try {
    fs.unlinkSync(path);
    return NextResponse.json({
      message: "ลบไฟล์สำเร็จแล้ว",
      status: "success",
    });
  } catch (error) {
    return NextResponse.json({
      message: "ไม่สามารถลบไฟล์ได้ โปรดลองใหม่อีกครั้ง",
      status: "error",
      error: error,
    });
  }
}
