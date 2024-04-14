import { BookingTable } from "@/components/backoffice/datatable/booking";
import PageHeader from "@/components/backoffice/pageheader/pageheader";
import SignIn from "@/components/backoffice/signIn";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import db from "@/configs/db";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

async function getData(page: number, limit: number, status: string) {
  const total = await db.booking.count({
    where: {
      status: status,
    },
  });
  const totalPage = Math.ceil(total / limit);
  const booking = await db.booking.findMany({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      status: status,
    },
    orderBy: {
      id: "desc",
    },
  });

  return { booking, total, totalPage };
}

async function getAllData(page: number, limit: number) {
  const total = await db.booking.count();
  const totalPage = Math.ceil(total / limit);
  const booking = await db.booking.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      id: "desc",
    },
  });

  return { booking, total, totalPage };
}

async function BackofficeBookingPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/backoffice/signin");
  }

  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const limit = searchParams.limit
    ? parseInt(searchParams.limit as string)
    : 10;

  const pending = await getData(page, limit, "pending");
  const paid = await getData(page, limit, "paid");
  const cancel = await getData(page, limit, "cancel");
  const checkin = await getData(page, limit, "checkin");
  const checkout = await getData(page, limit, "checkout");
  const all = await getAllData(page, limit);

  const booking = {
    pending,
    paid,
    cancel,
    checkin,
    checkout,
    all,
  };

  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[{ title: "การจอง", path: "/backoffice/booking" }]}
        title="การจอง"
        extra={
          <div>
            <Link
              href="/backoffice/booking/create-booking"
              className={buttonVariants({
                className: "flex items-center",
              })}
            >
              <Plus size={14} className="mr-2" />
              สร้างการจองใหม่
            </Link>
          </div>
        }
      />
      <BookingTable {...booking} />
    </PageWrapper>
  );
}

export default BackofficeBookingPage;
