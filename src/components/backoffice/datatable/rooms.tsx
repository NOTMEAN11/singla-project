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
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from "@/components/combobox";
import { BedSingle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RoomType } from "@prisma/client";
import Image from "next/image";
import { THB } from "@/lib/utils";

function RoomsTable() {
  return (
    <div className="my-4 border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>หมายเลขห้อง</TableHead>
            <TableHead>ประเภทห้องพัก</TableHead>
            <TableHead>สถานะห้องพัก</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function RoomsTypeTable() {
  const [data, setData] = useState<RoomType[]>([]);
  const [filterCap, setFilterCap] = useState([
    { id: 0, name: "เรียงจากมากไปน้อย" },
    { id: 1, name: "เรียงจากน้อยไปมาก" },
  ]);
  useEffect(() => {
    fetch("/api/roomtypes")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <div className="flex items-center space-x-2">
        <Input className="max-w-sm" placeholder="ค้นหา" />
        <Combobox
          data={filterCap}
          placeholder="ความจุผู้พัก"
          icon={<BedSingle className="w-4 h-4 mr-2" />}
          className="border-dashed"
        />
      </div>
      <div className="my-4 border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>หมายเลข</TableHead>
              <TableHead>ประเภทห้องพัก</TableHead>
              <TableHead>ราคา</TableHead>
              <TableHead>ความจุผู้พัก</TableHead>
              <TableHead>คำอธิบาย</TableHead>
              <TableHead>รูปภาพ</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{THB(item.price)}</TableCell>
                <TableCell>{item.capacity}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export { RoomsTable, RoomsTypeTable };
