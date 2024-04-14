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
import RoomsTable from "@/components/backoffice/datatable/rooms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateRoomDialog from "@/components/backoffice/dialog/rooms/create";

async function getData(page: number, limit: number, status: string) {
  const total = await db.room.count({
    where: {
      status: status,
    },
  });
  const totalPage = Math.ceil(total / limit);
  const data = await db.room.findMany({
    take: limit,
    skip: (page - 1) * limit,
    where: {
      status: status,
    },
    orderBy: {
      id: "desc",
    },
  });

  return { data, total, totalPage };
}

async function getAllData(page: number, limit: number) {
  const total = await db.room.count();
  const totalPage = Math.ceil(total / limit);
  const data = await db.room.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      id: "desc",
    },
  });

  return { data, total, totalPage };
}

async function RoomsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/backoffice");
  }

  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const limit = searchParams.limit
    ? parseInt(searchParams.limit as string)
    : 10;

  const all = await getAllData(page, limit);
  const available = await getData(page, limit, "available");
  const housekeeping = await getData(page, limit, "housekeeping");
  const maintenance = await getData(page, limit, "maintenance");
  const unspecified = await getData(page, limit, "unspecified");

  const rooms = {
    all,
    available,
    housekeeping,
    maintenance,
    unspecified,
  };

  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[
          { title: "ห้องพัก", path: "/backoffice/rooms" },
          {
            title: "จัดการห้องพัก",
            path: "/backoffice/rooms/manage-rooms",
          },
        ]}
        title="จัดการห้องพัก"
        extra={<CreateRoomDialog />}
      />

      <RoomsTable {...rooms} />
    </PageWrapper>
  );
}

export default RoomsPage;
