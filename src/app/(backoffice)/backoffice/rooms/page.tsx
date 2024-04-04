import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { RoomsTable } from "@/components/backoffice/datatable/rooms";
import Image from "next/image";

async function RoomsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/backoffice");
  }

  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[{ title: "ห้องพัก", path: "/backoffice/rooms" }]}
        title="ห้องพัก"
      />

      <div className="grid grid-cols-2 gap-4 my-2">
        <div className="relative flex flex-col items-center justify-center border">
          <Image
            src="/assets/rooms/room2.2.jpg"
            alt="ประเภทห้องพัก"
            width={1024}
            height={683}
            className="object-cover mb-4 rounded-md brightness-50"
          />
          <p className="absolute text-4xl font-bold text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            จัดการประเภทห้องพัก
          </p>
          <Link
            href="/backoffice/rooms/manage-roomtypes"
            className={buttonVariants({
              className: "w-full",
            })}
          >
            จัดการประเภทห้องพัก
          </Link>
        </div>
        <div className="relative flex flex-col items-center justify-center border">
          <Image
            src="/assets/rooms/room2.jpg"
            alt="ประเภทห้องพัก"
            width={1024}
            height={683}
            className="object-cover mb-4 rounded-md brightness-50"
          />
          <p className="absolute text-4xl font-bold text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            จัดการห้องพัก
          </p>
          <Link
            href="/backoffice/rooms/manage-rooms"
            className={buttonVariants({
              className: "w-full",
            })}
          >
            จัดการห้องพัก
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}

export default RoomsPage;
