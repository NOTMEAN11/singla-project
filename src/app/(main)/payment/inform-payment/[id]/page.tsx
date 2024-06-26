import PageHeader from "@/components/pageheader/pageheader";

import InformCheck from "@/components/section/inform-payment/check-form";

import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";

import db from "@/configs/db";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Booking } from "@prisma/client";
import PaymentForm from "@/components/section/inform-payment/payment-form";

type Error = {
  message: string;
  status: number;
};

async function getBookingId(id: string) {
  const booking = await db.booking.findUnique({
    where: {
      id: id,
    },
  });

  return booking;
}

async function InformPaymentIdPage({ params }: { params: { id: string } }) {
  const bookingId = await getBookingId(params.id);

  if (!bookingId) {
    return redirect("/payment/inform-payment");
  }
  return (
    <PageWrapper className="mt-20">
      <ContainerWrapper>
        <PageHeader
          title="แจ้งการชำระเงิน"
          breadcrumb={[
            { title: "ชำระเงิน", path: "/payment" },
            { title: "แจ้งการชำระเงิน", path: "/payment/inform-payment" },
          ]}
          //   disableTitle
        />
        <div>
          <InformCheck />
          <PaymentForm booking={bookingId} />
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default InformPaymentIdPage;
