import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { HomeIcon, Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import db from "@/configs/db";
import {
  RoomsTable,
  RoomsTypeTable,
} from "@/components/backoffice/datatable/rooms";

async function RoomsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/backoffice");
  }

  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[
          { title: "ห้องพัก", path: "/backoffice/rooms" },
          {
            title: "จัดการประเภทห้องพัก",
            path: "/backoffice/rooms/manage-roomtypes",
          },
        ]}
        title="จัดการประเภทห้องพัก"
        extra={
          <div className="flex items-center space-x-2">
            <Link
              href="/rooms/create-room"
              className={buttonVariants({
                className: "flex items-center justify-center space-x-2",
              })}
            >
              <Plus size={14} /> <div>เพิ่มประเภทห้องพัก</div>
            </Link>
          </div>
        }
      />

      <Card className="my-2 rounded-md">
        <CardContent className="p-4">
          <RoomsTypeTable />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

export default RoomsPage;
