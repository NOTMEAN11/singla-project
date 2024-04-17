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
import ImageSection from "@/components/backoffice/section/imagepage/imagesection";
import { UploadSection } from "@/components/backoffice/section/imagepage/uploadsection";
import CreateFolder from "@/components/backoffice/section/imagepage/create-folder";

async function BackofficeImagePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/backoffice/signin");
  }
  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[{ title: "คลังภาพ", path: "/backoffice/image" }]}
        title="คลังภาพ"
        extra={<CreateFolder />}
      />
      <Card className="my-2 rounded-md">
        <CardHeader>
          <CardTitle>คลังภาพ</CardTitle>
          <CardDescription>จัดการภาพทั้งหมดที่อัพโหลดขึ้นมา</CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <Card>
            <CardContent className="p-4">
              <ImageSection />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="uppercase">อัปโหลดไฟล์</CardTitle>
          <CardDescription> อัปโหลดไฟล์เข้าสู่ระบบ</CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <Card>
            <CardContent className="p-4">
              <UploadSection />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

export default BackofficeImagePage;
