import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const dir = searchParams.get("dir");
  if (!dir) {
    return NextResponse.json(
      { message: "Directory not found", status: "not-found" },
      { status: 404 }
    );
  }
  try {
    const path = __dirname + "../../../../../../../public/assets/" + dir + "/";
    const files = fs.readdirSync(path);
    const images = files
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file)) // Filter out non-image files
      .map((image) => ({
        src: `/assets/${dir}/${image}`,
        alt: image,
      }));

    if (images.length === 0) {
      return NextResponse.json(
        { message: "No images found in this directory", status: "not-found" },
        { status: 404 }
      );
    }

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", status: "error" },
      { status: 500 }
    );
  }
}
