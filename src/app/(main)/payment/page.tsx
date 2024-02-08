"use client";
import PageHeader from "@/components/pageheader/pageheader";
import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function PaymentPage() {
  const status =
    "checkIn" || "checkOut" || "unpaid" || "paid" || "cancel" || "noShow";
  const bookings = [
    {
      id: "123456789",
      name: "John Doe",
      checkIn: "2022-12-12",
      checkOut: "2022-12-15",
      total: 1000,
      status: "unpaid",
    },
    {
      id: "123456710",
      name: "John Doe",
      checkIn: "2022-12-12",
      checkOut: "2022-12-15",
      total: 1000,
      status: "paid",
    },
  ];

  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const bookingId = formData.get("bookingId");

    const booking = bookings.find((booking) => booking.id === bookingId);
    if (!booking) {
      return toast.error("ไม่พบหมายเลขที่จอง");
    }

    switch (booking.status) {
      case "unpaid":
        return redirect(`/payment/${booking.id}`);
      case "paid":
        return toast.info("คุณได้ชำระเงินแล้ว");
      case "cancel":
        return toast.error("คุณได้ยกเลิกการจองแล้ว");
      case "noShow":
        return toast.error("คุณไม่ได้มาเข้าพัก");
    }
  }
  return (
    <PageWrapper className="mt-20">
      <ContainerWrapper>
        <PageHeader
          title="ชำระเงิน"
          breadcrumb={[{ title: "ชำระเงิน", path: "/payment" }]}
          //   disableTitle
        />
        <div>
          <h1>ค้นหาหมายเลขที่จอง</h1>
          <form onSubmit={handleSearch}>
            <input type="text" placeholder="หมายเลขที่จอง" name="bookingId" />
            <button>ค้นหา</button>
          </form>
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default PaymentPage;
