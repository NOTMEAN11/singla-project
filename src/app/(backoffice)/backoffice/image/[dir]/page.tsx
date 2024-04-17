import PageHeader from "@/components/backoffice/pageheader/pageheader";

import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import db from "@/configs/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageSection from "@/components/backoffice/section/imagepage/imagedirsection";
import {
  UploadDirectorySection,
  UploadSection,
} from "@/components/backoffice/section/imagepage/uploadsection";

type TFiles = {
  name: string;
  path: string;
};

async function BackofficeImagePage({ params }: { params: { dir: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/backoffice/signin");
  }

  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[
          { title: "คลังภาพ", path: "/backoffice/image" },
          { title: params.dir, path: "/backoffice/image/" + params.dir },
        ]}
        title={params.dir}
      />
      <Card className="my-2 rounded-md">
        <CardHeader>
          <CardTitle className="uppercase">โฟล์เดอร์ {params.dir}</CardTitle>
          <CardDescription>จัดการภาพทั้งหมดในโฟล์เดอร์</CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <Card>
            <CardContent className="p-4">
              <ImageSection data={params.dir} />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="uppercase">อัปโหลดไฟล์</CardTitle>
          <CardDescription>
            {" "}
            อัปโหลดไฟล์เข้าสู่ระบบ เมื่ออัปโหลดไฟล์เสร็จสิ้นให้ทำการ Refresh
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <Card>
            <CardContent className="p-4">
              <UploadDirectorySection directory={params.dir} />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

export default BackofficeImagePage;
