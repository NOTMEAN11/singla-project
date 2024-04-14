import CreateBooking from "@/components/backoffice/form/create-booking";
import EditBooking from "@/components/backoffice/form/edit-booking";
import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";

function CreateBookingPage() {
  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[
          { title: "การจอง", path: "/backoffice/booking" },
          { title: "สร้างการจองใหม่", path: "/backoffice/booking/create" },
        ]}
        title="สร้างการจองใหม่"
      />
      <Card className="my-2">
        <CardHeader>
          <CardTitle>สร้างการจองใหม่</CardTitle>
          <CardDescription>
            สำหรับลูกค้าที่ต้องการใช้บริการแบบ Walk-In
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateBooking />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

export default CreateBookingPage;
