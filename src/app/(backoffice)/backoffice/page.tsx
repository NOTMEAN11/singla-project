import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import {
  BedDouble,
  Calendar,
  CalendarCheck,
  CalendarX,
  HomeIcon,
  LogIn,
  LogOut,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import db from "@/configs/db";
import StatusChart from "@/components/backoffice/section/mainpage/status-chart";
import BookingChart from "@/components/backoffice/section/mainpage/booking-chart";
import { findDateMonth } from "@/lib/utils";
import { room } from "@/configs/constant";
import { calculateMonthlyStats } from "@/lib/filter";

async function GetData() {
  const room = await db.room.count({
    where: {
      OR: [
        {
          status: "available",
        },
      ],
    },
  });

  const rooms = await db.room.findMany();

  const booking = await db.booking.count({
    where: {
      OR: [
        {
          status: "pending",
        },
        {
          status: "paid",
        },
      ],
    },
  });

  const checkin = await db.booking.count({
    where: {
      status: "checkin",
    },
  });
  const checkout = await db.booking.count({
    where: {
      status: "checkout",
    },
  });

  const monthlyStats = await db.booking.findMany({
    where: {
      OR: [{ status: "paid" }, { status: "checkin" }, { status: "checkout" }],
    },
    select: {
      totalPrice: true,
      checkIn: true,
    },
  });

  const roomtype = await db.roomType.findMany({});

  const monthlyStatsRoomtype = await db.booking.findMany({
    where: {
      OR: [{ status: "paid" }, { status: "checkin" }, { status: "checkout" }],
    },
    include: {
      room: {
        select: {
          roomTypeId: true,
        },
      },
    },
  });

  return {
    rooms,
    room,
    roomtype,
    booking,
    monthlyStats,
    monthlyStatsRoomtype,
    checkin,
    checkout,
  };
}

async function BackofficeMainPage() {
  const session = await getServerSession(authOptions);
  const data = await GetData();
  // console.log(data.monthlyStatsRoomtype);

  const chartData = [
    {
      name: "ว่าง",
      value: data.rooms.filter((room) => room.status === "available").length,
    },
    {
      name: "ทำความสะอาด",
      value: data.rooms.filter((room) => room.status === "housekeeping").length,
    },
    {
      name: "ซ่อมบำรุง",
      value: data.rooms.filter((room) => room.status === "maintenance").length,
    },
    {
      name: "ไม่ระบุ",
      value: data.rooms.filter((room) => room.status === "unspecified").length,
    },
  ];

  const CardItem = [
    {
      icon: <Calendar size={24} />,
      title: "ยอดจองทั้งหมด",
      unit: "ครั้ง",
      value: data.booking,
    },
    {
      icon: <BedDouble size={24} />,
      title: "จำนวนห้องที่ว่างอยู่",
      unit: "ห้อง",
      value: data.room,
    },
    {
      icon: <CalendarCheck size={24} />,
      title: "จำนวนเช็คอิน",
      unit: "ครั้ง",
      value: data.checkin,
    },
    {
      icon: <CalendarX size={24} />,
      title: "จำนวนเช็คเอ้าท์",
      unit: "ครั้ง",
      value: data.checkout,
    },
  ];

  const roomtypeStats = data.roomtype.map((item) => {
    const roomtype = item.id;
    const roomtypeStats = data.monthlyStatsRoomtype.filter(
      (room) => room.room.roomTypeId === roomtype
    );
    const name = data.roomtype.find((room) => room.id === roomtype)?.name;

    return {
      name,
      roomtype,
      stats: roomtypeStats.length,
    };
  });

  const filter = calculateMonthlyStats(data.monthlyStats);

  if (!session) {
    return redirect("/backoffice/signin");
  }

  return (
    <PageWrapper>
      <PageHeader breadcrumb={[]} title="ภาพรวม" />
      <div className="grid grid-cols-4 gap-4 my-2">
        {CardItem.map((item, index) => (
          <Card
            key={index}
            className="flex items-center w-full max-w-md p-2 space-x-2 rounded-md"
          >
            <div className="p-3 border rounded">{item.icon} </div>

            <div className="text-primary">
              <h1 className="text-sm">{item.title}</h1>
              <p className="text-lg font-bold">
                {item.value} {item.unit}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4 my-2">
        <BookingChart data={filter} className="col-span-3" />
        <StatusChart data={chartData} />
        <Card className="col-span-4 rounded-md">
          <CardHeader>
            <CardTitle>ประเภทห้อง</CardTitle>
            <CardDescription>
              รายงานเกี่ยวกับสถานะของประเภทห้องพักที่มีการจองในเดือนนี้
            </CardDescription>
            <CardContent className="p-0">
              <div className="flex items-center space-x-2 text-sm">
                {roomtypeStats.map((item, index) => (
                  <div key={index} className="p-2 border rounded-md">
                    <h1>
                      {item.name} การจองทั้งหมด {item.stats} ครั้ง
                    </h1>
                  </div>
                ))}
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </PageWrapper>
  );
}

export default BackofficeMainPage;
