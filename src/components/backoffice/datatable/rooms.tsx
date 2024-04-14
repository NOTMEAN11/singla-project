"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Trash2 } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@prisma/client";
import EditRoomDialog from "../dialog/rooms/edit";

import Link from "next/link";

type TData = {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  image: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
  rooms: TRoom[];
};

type TRoom = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  roomTypeId: string;
};

type TRoomsTable = {
  data: Room[];
  total: number;
  totalPage: number;
};

type RoomsTableProps = {
  all: TRoomsTable;
  available: TRoomsTable;
  housekeeping: TRoomsTable;
  maintenance: TRoomsTable;
  unspecified: TRoomsTable;
};

type CardProps = {
  rooms: TRoomsTable;
  roomType: TData[];
};

function RoomsTable({
  all,
  available,
  housekeeping,
  maintenance,
  unspecified,
}: RoomsTableProps) {
  const [roomType, setRoomType] = useState<TData[]>([]);
  const status = [
    { name: "ทั้งหมด", value: all, valueStr: "all", color: "gray" },
    { name: "ว่าง", value: available, valueStr: "available", color: "green" },
    {
      name: "ทำความสะอาด",
      value: housekeeping,
      valueStr: "housekeeping",
      color: "blue",
    },
    {
      name: "ซ่อมบำรุง",
      value: maintenance,
      valueStr: "maintenance",
      color: "yellow",
    },
    {
      name: "ไม่ระบุ",
      value: unspecified,
      valueStr: "unspecified",
      color: "red",
    },
  ];

  useEffect(() => {
    fetch("/api/roomtypes")
      .then((res) => res.json())
      .then((data) => setRoomType(data));
  }, []);
  return (
    <div className="my-4 rounded-md">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-card">
          <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
          <TabsTrigger value="available">ว่าง</TabsTrigger>
          <TabsTrigger value="housekeeping">ทำความสะอาด</TabsTrigger>
          <TabsTrigger value="maintenance">ซ่อมบำรุง</TabsTrigger>
          <TabsTrigger value="unspecified">ไม่ระบุ</TabsTrigger>
        </TabsList>
        {status.map((status) => (
          <TabsContent key={status.name} value={status.valueStr}>
            <CardRooms rooms={status.value} roomType={roomType} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function CardRooms({ rooms, roomType }: CardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") as string) || 1;

  const status = [
    { name: "ทั้งหมด", value: "all", color: "gray" },
    { name: "ว่าง", value: "available", color: "green" },
    { name: "ทำความสะอาด", value: "housekeeping", color: "blue" },
    { name: "ซ่อมบำรุง", value: "maintenance", color: "yellow" },
    { name: "ไม่ระบุ", value: "unspecified", color: "red" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>ห้องพักทั้งหมด</CardTitle>
        <CardDescription>
          รายการของห้องพักทั้งหมด ที่มีในระบบ สามารถดูข้อมูลห้องพักแต่ละห้องได้
          และสามารถแก้ไขหรือลบข้อมูลได้ โดยคลิกที่ปุ่มแก้ไขหรือลบ
          ที่อยู่ในแต่ละแถวของตาราง หรือสามารถเพิ่มห้องพักได้
          โดยคลิกที่ปุ่มเพิ่มห้องพัก ที่ด้านบนขวา
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>หมายเลขห้อง</TableHead>
              <TableHead>ประเภทห้องพัก</TableHead>
              <TableHead>สถานะห้องพัก</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center ">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
            {rooms.data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {roomType.find((i) => i.id === item.roomTypeId)?.name}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`bg-${
                      status.find((i) => i.value === item.status)?.color
                    }-500`}
                  >
                    {status.find((i) => i.value === item.status)?.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditRoomDialog data={item} id={item.id} />
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
                              fetch("/api/rooms/" + item.id, {
                                method: "DELETE",
                              })
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          แสดง <strong>{rooms.data.length}</strong> ใน{" "}
          <strong>{rooms.total}</strong> ห้องพักทั้งหมด
        </div>
        <div className="space-x-4">
          <Button disabled={page === 1}>
            <Link href={page === 1 ? "#" : pathname + `?page=${page - 1}`}>
              ก่อนหน้า
            </Link>
          </Button>
          <Button disabled={page >= rooms.totalPage}>
            <Link
              href={
                page >= rooms.totalPage ? "#" : pathname + `?page=${page + 1}`
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

export default RoomsTable;
