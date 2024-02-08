"use client";
import HoverIcon from "@/components/hover-icon";
import { roomtype } from "@/configs/constant";
import useBookingStore from "@/hooks/usebooking";
import { THB } from "@/lib/utils";
import { InfoIcon, Lock } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

function ConfirmSummary() {
  const { checkInDate, checkOutDate, room, guest, fee, options, setOptions } =
    useBookingStore();

  const router = useRouter();
  const ROOM_TYPE = roomtype.find((item) => item.id === room);

  const checkInDateObj = new Date(checkInDate!);
  const checkOutDateObj = new Date(checkOutDate!);
  const timeDifference = checkOutDateObj.getTime() - checkInDateObj.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  const motocycle = daysDifference > 4 ? 1400 : 350 * daysDifference;
  const shuttle = 300 * guest!.adults + guest!.children * 150;
  const buffet = 199 * guest!.adults;

  const usercoupon = "123456789";
  const coupons = [
    { code: "1234", discount: 100 },
    { code: "12345", discount: 200 },
    { code: "123456", discount: 300 },
    { code: "1234567", discount: 400 },
    { code: "12345678", discount: 500 },
    { code: "123456789", discount: 600 },
  ];

  function getTotalPrice() {
    let price = ROOM_TYPE?.price! + fee;
    if (options?.buffet) {
      price += 199 * guest!.adults;
    }

    // if (isMotocycle) {
    //   price += motocycle;
    // }

    if (options?.shuttle) {
      price += shuttle;
    }

    if (usercoupon) {
      price -= coupons.find((item) => item.code === usercoupon)?.discount!;
    }

    let vat = price * 0.07;
    price += vat;
    return { price, vat };
  }

  const totalPrice = THB(getTotalPrice().price);
  const feePrice = THB(fee);
  const vatPrice = THB(getTotalPrice().vat);
  const couponDiscount = THB(
    coupons.find((item) => item.code === usercoupon)?.discount!
  );

  async function handleSubmit() {
    router.push("/booking?step=complete");
  }

  return (
    <>
      <div className="p-2 border rounded-md text-xs my-4">
        <h1 className="text-sm mb-2 font-bold">สรุปราคาของคุณ</h1>
        <div className="grid grid-cols-2 bg-gray-200 p-2">
          <h1 className="text-2xl font-bold">ยอดรวม</h1>
          <div>
            <h2 className="text-xl font-bold">{totalPrice}</h2>
            <p>รวมภาษีและค่าธรรมเนียมแล้ว</p>
          </div>
        </div>
        <div>
          <h1 className="text-sm mt-2 mb-1">ข้อมูลเกี่ยวกับราคา</h1>

          <div className="flex items-center justify-between">
            <p>
              ส่วนลด{" "}
              <span className="text-gray-400 text-xs">({usercoupon})</span>
            </p>
            <p className="text-red-500">-{couponDiscount}</p>
          </div>
          <div className="flex items-center justify-between">
            <p> ภาษีมูลค่าเพิ่ม (VAT) 7% </p>
            <p>{vatPrice}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <p>ค่าธรรมเนียม</p>
              <HoverIcon
                icon={<InfoIcon size={14} />}
                content={
                  <div>
                    <p>
                      รีสอร์ทขอบริการค่าประกันห้องพักเพื่อความปลอดภัยและการรักษาความสะอาดของห้องพัก
                      ท่านลูกค้าสามารถเพิ่มความมั่นใจในการพักผ่อนได้โดยการชำระค่าประกันที่จะคืนให้หลังจากการเช็คเอาท์
                    </p>
                  </div>
                }
              />
            </div>
            <p>{feePrice}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Button className="text-xs" variant="outline">
          <Link href="/booking?step=details">แก้ไขรายละเอียด</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-xs space-x-1">
              <Lock size={14} /> <p>ยืนยันการจอง</p>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>ยืนยันการจองห้องพัก</AlertDialogTitle>
              <AlertDialogDescription>
                หลังจากทำรายการแล้วระบบจะทำการจองห้องพักให้ท่านโดยอัตโนมัติ
                กรุณาตรวจสอบข้อมูลของท่านก่อนทำการยืนยันการจองห้องพัก
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                ยืนยัน
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default ConfirmSummary;
