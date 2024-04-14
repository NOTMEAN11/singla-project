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
import RoomsTypeTable from "@/components/backoffice/datatable/roomtype";
import CreateRoomTypeDialog from "@/components/backoffice/dialog/roomtype/create";

async function RoomsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/backoffice/signin");
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
        extra={<CreateRoomTypeDialog />}
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
