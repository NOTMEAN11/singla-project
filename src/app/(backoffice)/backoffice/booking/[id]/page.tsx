import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import React from "react";
import db from "@/configs/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";
import EditBooking from "@/components/backoffice/form/edit-booking";
import { THB } from "@/lib/utils";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getData(id: string) {
  const booking = await db.booking.findUnique({
    where: {
      id: id,
    },
  });

  const room = await db.room.findUnique({
    where: {
      id: booking?.roomId,
    },
    include: {
      roomType: true,
    },
  });

  return { booking, room };
}

async function DetailBookingPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/backoffice/signin");
  }
  const { booking, room } = await getData(params.id);
  if (!booking) {
    return <div>ไม่พบหมายเลขที่จอง</div>;
  }
  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[
          { title: "การจอง", path: "/backoffice/booking" },
          {
            title: "รายละเอียดการจอง",
            path: `/backoffice/booking/${params.id}`,
          },
        ]}
        title={`รายละเอียดการจอง`}
      />
      <Card className="my-2">
        <CardHeader>
          <CardTitle>รายละเอียดการจอง</CardTitle>
          <CardDescription> หมายเลขการจอง: {booking.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <EditBooking booking={booking} />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

export default DetailBookingPage;
