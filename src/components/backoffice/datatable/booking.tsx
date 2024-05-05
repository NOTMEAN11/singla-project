"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { THB } from "@/lib/utils";
import { Booking } from "@prisma/client";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";
import { Edit2, Trash2 } from "lucide-react";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

type BookingTableProps = {
  all: TData;
  pending: TData;
  paid: TData;
  cancel: TData;
  checkin: TData;
  checkout: TData;
};

type TData = {
  booking: Booking[];
  total: number;
  totalPage: number;
};

type DataTableProps = {
  data: TData;
  title: string;
  description: string;
};

function BookingTable({
  all,
  pending,
  paid,
  cancel,
  checkin,
  checkout,
}: BookingTableProps) {
  const arr = [
    { name: "ทั้งหมด", data: all, value: "all" },
    { name: "ยังไม่ชำระเงิน", data: pending, value: "pending" },
    { name: "ชำระเงินแล้ว", data: paid, value: "paid" },
    { name: "ยกเลิก", data: cancel, value: "cancel" },
    { name: "เช็คอิน", data: checkin, value: "checkin" },
    { name: "เช็คเอาท์", data: checkout, value: "checkout" },
  ];
  return (
    <div className="my-4 rounded-md">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-card">
          <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
          <TabsTrigger value="pending">ยังไม่ชำระเงิน</TabsTrigger>
          <TabsTrigger value="paid">ชำระเงินแล้ว</TabsTrigger>
          <TabsTrigger value="cancel">ยกเลิก</TabsTrigger>
          <TabsTrigger value="checkin">เช็คอิน</TabsTrigger>
          <TabsTrigger value="checkout">เช็คเอาท์</TabsTrigger>
        </TabsList>

        {arr.map((status) => (
          <TabsContent key={status.name} value={status.value}>
            <DataTable
              data={status.data}
              title={status.name}
              description={
                status.data !== all
                  ? `แสดงข้อมูลการจองที่มีสถานะ${status.name}`
                  : "แสดงข้อมูลการจองทั้งหมด"
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function DataTable({ data, title, description }: DataTableProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") as string) || 1;

  const status = [
    { name: "ยังไม่ชำระเงิน", value: "pending", color: "bg-red-500" },
    { name: "ชำระเงินแล้ว", value: "paid", color: "bg-green-500" },
    { name: "ยกเลิก", value: "cancel", color: "bg-gray-500" },
    { name: "เช็คอิน", value: "checkin", color: "bg-blue-500" },
    { name: "เช็คเอาท์", value: "checkout", color: "bg-yellow-500" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">เลขที่</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead>อีเมล์</TableHead>
              <TableHead>เบอร์โทร</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead>ผู้เข้าพัก</TableHead>
              <TableHead>วันที่เช็คอิน</TableHead>
              <TableHead>วันที่เช็คเอาท์</TableHead>
              <TableHead>ส่วนลด</TableHead>
              <TableHead>ค่าธรรมเนียม</TableHead>
              <TableHead>ราคาสุทธิ</TableHead>
              <TableHead>ส่วนเสริม</TableHead>
              <TableHead className="text-center">แจ้งเตือน</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.booking.length === 0 && (
              <TableRow>
                <TableCell colSpan={12} className="text-center ">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
            {data.booking.map((booking, index) => {
              const today = new Date().setHours(0, 0, 0, 0);
              const todayDate = new Date(today);
              const checkIn = new Date(booking.checkIn);
              const daysDifference = Math.floor(
                (checkIn.getTime() - todayDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              const showDays = daysDifference > 0 ? daysDifference : 0;
              const showDaysText =
                showDays <= 3 && showDays != 0 ? (
                  <Badge className="bg-red-500">{showDays} วัน</Badge>
                ) : showDays > 5 || showDays === 0 ? (
                  ""
                ) : (
                  <Badge className="bg-yellow-500">{showDays} วัน</Badge>
                );
              return (
                <TableRow key={booking.id}>
                  <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.phone}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        status.find((i) => i.value === booking.status)?.color
                      }
                    >
                      {status.find((i) => i.value === booking.status)?.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.children === 0
                      ? booking.adults + " คน"
                      : `ผู้ใหญ่ ${booking.adults} และ ${booking.children} คน`}{" "}
                  </TableCell>
                  <TableCell>
                    {format(new Date(booking.checkIn), "dd/MM/yyyy", {
                      locale: th,
                    })}
                  </TableCell>
                  <TableCell>
                    {format(new Date(booking.checkOut), "dd/MM/yyyy", {
                      locale: th,
                    })}
                  </TableCell>
                  <TableCell>{THB(booking.discountPrice)}</TableCell>
                  <TableCell>{THB(booking.feePrice)}</TableCell>
                  <TableCell>{THB(booking.totalPrice)}</TableCell>
                  <TableCell className="space-x-2">
                    {!booking.isBuffet && !booking.isPickup && (
                      <Badge>ไม่มี</Badge>
                    )}
                    {booking.isBuffet ? <Badge>บุฟเฟ่ต์เช้า</Badge> : ""}
                    {booking.isPickup ? <Badge>รถรับส่ง</Badge> : ""}
                  </TableCell>
                  <TableCell className="text-center">{showDaysText}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link href={`/backoffice/booking/${booking.id}`}>
                        <Edit2 size={16} className="text-yellow-500" />
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Trash2 size={14} className="text-red-500" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              คุณต้องการลบห้องพักนี้หรือไม่?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              หากลบแล้วจะไม่สามารถกู้คืนได้อีก คุณแน่ใจหรือไม่?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                fetch(
                                  "/api/booking/" + data.booking[index].id,
                                  {
                                    method: "DELETE",
                                  }
                                )
                              }
                            >
                              ตกลง
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          แสดง <strong>{data.booking.length}</strong> ใน{" "}
          <strong>{data.total}</strong> ห้องพักทั้งหมด
        </div>
        <div className="space-x-4">
          <Button disabled={page === 1}>
            <Link href={page === 1 ? "#" : pathname + `?page=${page - 1}`}>
              ก่อนหน้า
            </Link>
          </Button>
          <Button disabled={page >= data.totalPage}>
            <Link
              href={
                page >= data.totalPage ? "#" : pathname + `?page=${page + 1}`
              }
            >
              ถัดไป
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export { BookingTable };
