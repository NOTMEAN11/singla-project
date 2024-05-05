import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";

import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CouponSection from "@/components/backoffice/datatable/coupon";
import PromotionSection from "@/components/backoffice/datatable/promotion";
import CreateCouponDialog from "@/components/backoffice/dialog/coupon/create";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";

async function BackofficeMainPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/backoffice/signin");
  }

  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[{ title: "โปรโมชั่น", path: "/backoffice/promotion" }]}
        title="โปรโมชั่น"
        extra={
          <div className="flex space-x-2">
            {/* <Link
              href="/backoffice/promotion/create"
              className={buttonVariants()}
            >
              <Plus size={14} className="mr-2" />
              สร้างโปรโมชั่น
            </Link> */}
            <CreateCouponDialog />
          </div>
        }
      />
      <div className="my-2">
        <Card>
          <CardHeader>
            <CardTitle>คูปองทั้งหมด</CardTitle>
            <CardDescription>การจัดการคูปองทั้งหมด</CardDescription>
          </CardHeader>
          <CardContent>
            <CouponSection />
          </CardContent>
        </Card>
        {/* <Card className="my-4">
          <CardHeader>
            <CardTitle>เพจโปรโมชั่น</CardTitle>
            <CardDescription>
              เพจโปรโมชั่นทั้งหมด สามารถเพิ่ม แก้ไข ลบ โปรโมชั่นได้
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PromotionSection />
          </CardContent>
        </Card> */}
      </div>
      {/* <Editor /> */}
    </PageWrapper>
  );
}

export default BackofficeMainPage;
