"use client";
import HoverIcon from "@/components/hover-icon";
import useBookingStore from "@/hooks/usebooking";
import { THB, cn } from "@/lib/utils";
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
import useBookingInfo from "@/hooks/usebooking-info";
import { RoomType } from "@/types/room-type";
import { Coupon } from "@prisma/client";
import { toast } from "sonner";

type Props = {
  coupons: Coupon[];
  roomtype: RoomType[];
};

function ConfirmSummary({ coupons, roomtype }: Props) {
  const { checkInDate, checkOutDate, room, guest, fee, options, setOptions } =
    useBookingStore();
  const router = useRouter();

  const ROOM_TYPE = roomtype?.find((item) => item.id === room);

  const checkInDateObj = new Date(checkInDate!);
  const checkOutDateObj = new Date(checkOutDate!);
  const timeDifference = checkOutDateObj.getTime() - checkInDateObj.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  const motocycle = daysDifference > 4 ? 1400 : 350 * daysDifference;
  const shuttle = 300 * guest!.adults + guest!.children * 150;
  const buffet = 199 * guest!.adults;

  const { coupon, email, name, phone, request } = useBookingInfo();

  function getTotalPrice() {
    let price = ROOM_TYPE?.price! * daysDifference + fee;
    const isCouponOut =
      coupons.find((item) => item.code === coupon)?.total === 0;

    if (options?.buffet) {
      price += 199 * guest!.adults;
    }

    // if (isMotocycle) {
    //   price += motocycle;
    // }

    if (options?.shuttle) {
      price += shuttle;
    }

    if (coupon && !isCouponOut) {
      price -= coupons.find((item) => item.code === coupon)?.discount! || 0;
    }

    let vat = price * 0.07;
    price += vat;
    return { price, vat };
  }

  console.log(ROOM_TYPE?.price);

  const discount = coupons.find((item) => item.code === coupon)?.discount! || 0;
  const id = coupons.find((item) => item.code === coupon)?.id;

  const totalPrice = THB(getTotalPrice().price);
  const feePrice = THB(fee);
  const vatPrice = THB(getTotalPrice().vat);
  const couponDiscount = THB(discount);

  async function handleCoupon(id: string) {
    if (!id) return;
    const res = await fetch(`/api/promotions/coupon/${id}?type=use`, {
      method: "PATCH",
    });

    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message);
    }
  }

  async function handleSubmit() {
    toast.loading("กำลังทำการจองห้องพัก");
    await handleCoupon(id!);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          roomtypeId: room,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          adults: guest?.adults,
          children: guest?.children,
          isBuffet: options?.buffet,
          isPickup: options?.shuttle,
          feePrice: fee,
          discountPrice: discount,
          totalPrice: getTotalPrice().price,
          status: "pending",
          request,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        router.push("/booking?step=complete");
      }

      if (res.status === 404) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง");
      console.log(error);
    }
  }

  return (
    <>
      <div className="p-2 my-4 text-xs border rounded-md">
        <h1 className="mb-2 text-sm font-bold">สรุปราคาของคุณ</h1>
        <div className="grid grid-cols-2 p-2 bg-gray-200">
          <h1 className="text-2xl font-bold">ยอดรวม</h1>
          <div>
            <h2 className="text-xl font-bold">{totalPrice}</h2>
            <p>รวมภาษีและค่าธรรมเนียมแล้ว</p>
          </div>
        </div>
        <div>
          <h1 className="mt-2 mb-1 text-sm">ข้อมูลเกี่ยวกับราคา</h1>

          <div
            className={cn(
              "flex items-center justify-between",
              discount === 0 && "hidden"
            )}
          >
            <p>
              ส่วนลด <span className="text-xs text-gray-400">({coupon})</span>
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
            <Button className="space-x-1 text-xs">
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
