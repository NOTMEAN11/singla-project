import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";

import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import db from "@/configs/db";
import Editor from "@/components/backoffice/editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditPromotion from "@/components/backoffice/form/edit-promotion";

async function getData(id: string) {
  const promotion = await db.promotion.findUnique({
    where: {
      id: id,
    },
  });

  return { promotion };
}

async function BackofficeEditPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { promotion } = await getData(params.id);

  if (!session) {
    return redirect("/backoffice/signin");
  }

  if (!promotion) {
    return notFound();
  }

  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[
          { title: "โปรโมชั่น", path: "/backoffice/promotion" },
          {
            title: promotion?.name,
            path: "/backoffice/promotion" + promotion?.name,
          },
        ]}
        title={promotion?.name}
      />
      <div className="my-2">
        <Card>
          <CardHeader>
            <CardTitle>แก้ไขโปรโมชั่น</CardTitle>
            <CardDescription>แก้ไขโปรโมชั่นที่ต้องการ</CardDescription>
          </CardHeader>
          <CardContent>
            <EditPromotion data={promotion} />
          </CardContent>
        </Card>
        {/* <Editor /> */}
      </div>
    </PageWrapper>
  );
}

export default BackofficeEditPage;
