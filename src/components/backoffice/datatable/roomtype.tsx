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

import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { THB } from "@/lib/utils";
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

import EditRoomTypeDialog from "../dialog/roomtype/edit";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

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

function RoomsTypeTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [data, setData] = useState<TData[]>([]);
  const [filteredData, setFilteredData] = useState<TData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const price = searchParams.get("price") || "asc";
  const capacity = searchParams.get("capacity") || "asc";
  const roomType = searchParams.get("roomType") || "asc";
  const room = searchParams.get("room") || "asc";

  function handleSearch(value: string) {
    setFilteredData((prev) =>
      prev.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );

    if (value === "") {
      setFilteredData(data);
    }
  }

  function FilterData(type: "price" | "capacity" | "roomType" | "room") {
    const value = searchParams.get(type) || "asc";

    switch (type) {
      case "price":
        setFilteredData((prev) =>
          prev.sort((a, b) =>
            price === "desc" ? a.price - b.price : b.price - a.price
          )
        );
        break;
      case "capacity":
        setFilteredData((prev) =>
          prev.sort((a, b) =>
            capacity === "desc"
              ? a.capacity - b.capacity
              : b.capacity - a.capacity
          )
        );
        break;
      case "roomType":
        setFilteredData((prev) =>
          prev.sort((a, b) =>
            roomType === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          )
        );
        break;
      case "room":
        setFilteredData((prev) =>
          prev.sort((a, b) =>
            room === "desc"
              ? a.rooms.length - b.rooms.length
              : b.rooms.length - a.rooms.length
          )
        );
        break;
    }

    router.push(
      pathname + "?" + type + "=" + (value === "asc" ? "desc" : "asc")
    );
  }

  useEffect(() => {
    fetch("/api/roomtypes?room=true")
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Input
          className="max-w-sm"
          placeholder="ค้นหา"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button
          onClick={() =>
            fetch("/api/roomtypes?room=true")
              .then((res) => res.json())
              .then((data) => setData(data))
          }
        >
          รีเฟรช
        </Button>
      </div>
      <div className="my-4 border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">หมายเลข</TableHead>
              <TableHead
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => FilterData("roomType")}
              >
                <p>ประเภทห้องพัก</p>
                {roomType === "asc" ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronUp size={14} />
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => FilterData("price")}
              >
                <div className="flex items-center space-x-1">
                  <p>ราคา</p>
                  {price === "asc" ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronUp size={14} />
                  )}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer "
                onClick={() => FilterData("capacity")}
              >
                <div className="flex items-center justify-center space-x-1">
                  <p>ความจุผู้พัก</p>
                  {capacity === "asc" ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronUp size={14} />
                  )}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer "
                onClick={() => FilterData("room")}
              >
                <div className="flex items-center justify-center space-x-1">
                  <p>จำนวนห้อง</p>
                  {room === "asc" ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronUp size={14} />
                  )}
                </div>
              </TableHead>
              <TableHead>คำอธิบาย</TableHead>
              <TableHead>รูปภาพ</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{THB(item.price)}</TableCell>
                <TableCell className="text-center">{item.capacity}</TableCell>
                <TableCell className="text-center">
                  {item.rooms.length}
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="max-w-sm truncate">
                        {item.description}
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        {item.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="grid grid-cols-2 gap-2">
                  {item.image.map((img, idx) => (
                    <Image
                      src={img}
                      alt="img"
                      width={100}
                      height={100}
                      key={idx}
                    />
                  ))}
                </TableCell>

                <TableCell>{item.slug}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditRoomTypeDialog data={item} id={item.id} />

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Trash2 size={14} className="text-red-500" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            คุณต้องการลบประเภทห้องพักนี้หรือไม่?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            หากลบแล้วจะไม่สามารถกู้คืนได้อีก คุณแน่ใจหรือไม่?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              fetch("/api/roomtypes/" + item.id, {
                                method: "DELETE",
                              }).then((res) => {
                                if (res.ok) {
                                  setData((prev) =>
                                    prev.filter((i) => i.id !== item.id)
                                  );
                                  toast.success("ลบข้อมูลสำเร็จ");
                                }
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
            {filteredData.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-96">
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8} className="text-center h-96">
                  กำลังโหลดข้อมูล..
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default RoomsTypeTable;
