import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export async function GET(req: NextRequest) {
  //find all directories in the assets folder
  const path = __dirname + "../../../../../../../public/assets/";
  const dirs = fs.readdirSync(path);
  const directories = dirs
    .filter((dir) => fs.lstatSync(path + dir).isDirectory())
    .map((dir) => ({
      name: dir,
      path: `/assets/${dir}`,
      files: fs.readdirSync(path + dir),
    }));

  const files = fs
    .readdirSync(path)
    .filter((dir) => !fs.lstatSync(path + dir).isDirectory())
    .map((file) => ({
      name: file,
      path: `/assets/${file}`,
    }));

  if (directories.length === 0) {
    return NextResponse.json(
      { message: "No directories found", status: "not-found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ directories, files });
}

export async function POST(req: NextRequest) {
  // create a new directory in the assets folder
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type") || "folder";

  if (type === "file") {
    try {
      const data = await req.formData();

      const file: File | null = data.get("file") as unknown as File;
      const formData = new FormData();
      formData.set("files", file);
      const path = __dirname + "../../../../../../../public/assets/";
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

  if (type === "folder") {
    try {
      const body = await req.json();
      const { name } = body;
      if (!name) {
        return NextResponse.json(
          { message: "โปรดใส่ชื่อโฟล์เดอร์", status: "error" },
          { status: 400 }
        );
      }
      const path = __dirname + "../../../../../../../public/assets/" + name;
      fs.mkdirSync(path);
      return NextResponse.json({
        message: "โฟล์เดอร์ถูกสร้างแล้ว",
        status: "success",
      });
    } catch (error) {
      return NextResponse.json({
        message: "โฟล์เดอร์นี้มีอยู่แล้ว",
        status: "error",
      });
    }
  }
}

export async function DELETE(req: NextRequest) {
  // delete a files in the assets folder
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type") || "file";

  if (type === "file") {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return NextResponse.json(
        { message: "โปรดใส่ชื่อของไฟล์", status: "error" },
        { status: 400 }
      );
    }

    try {
      fs.unlinkSync(__dirname + "../../../../../../../public/assets/" + name);
      return NextResponse.json({
        message: "ไฟล์ถูกลบแล้ว",
        status: "success",
      });
    } catch (error) {
      return NextResponse.json({
        message: "ไม่สามารถลบไฟล์ได้",
        status: "error",
        error: error,
      });
    }
  }

  if (type === "folder") {
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return NextResponse.json(
        { message: "โปรดใส่ชื่อโฟล์เดอร์", status: "error" },
        { status: 400 }
      );
    }

    try {
      fs.rmdirSync(__dirname + "../../../../../../../public/assets/" + name, {
        recursive: true,
      });
      return NextResponse.json({
        message: "โฟล์เดอร์ถูกลบแล้ว",
        status: "success",
      });
    } catch (error) {
      return NextResponse.json({
        message: "ไม่สามารถลบโฟล์เดอร์ได้",
        status: "error",
        error: error,
      });
    }
  }
}
