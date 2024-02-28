"use client";
import React from "react";
import generatePayload from "promptpay-qr";
import QRCodeSVG from "qrcode.react";
import Image from "next/image";
import { Booking } from "@prisma/client";
import { THB } from "@/lib/utils";
import Dropzone from "@/components/section/inform-payment/dropzone";

type Props = {
  booking: Booking;
};

function PaymentForm({ booking }: Props) {
  const qr = generatePayload("0918474411", { amount: booking.totalPrice });

  return (
    <div className="p-4 my-2 border rounded-md">
      <div className="mb-2">
        <h1 className="text-lg font-semibold">แจ้งการชำระเงิน</h1>
        <p className="text-xs text-gray-500">
          กรุณาแจ้งการชำระเงินเพื่อยืนยันการจอง
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 my-4 lg:grid-cols-3 ">
        <div className="flex flex-col items-center justify-center md:my-4">
          <div className="flex flex-col items-center justify-center w-full border max-w-[300px]">
            <Image
              src="/assets/qr/frame01.png"
              alt="top"
              width={300}
              height={200}
            />
            <QRCodeSVG
              value={qr}
              size={256}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={true}
              // imageSettings={{
              //   src: "/assets/qr/icon-thaiqr.png",
              //   x: undefined,
              //   y: undefined,
              //   height: 30,
              //   width: 30,
              //   excavate: true,
              // }}
              className="hidden my-2 md:block"
            />
            <QRCodeSVG
              value={qr}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"L"}
              includeMargin={true}
              // imageSettings={{
              //   src: "/assets/qr/icon-thaiqr.png",
              //   x: undefined,
              //   y: undefined,
              //   height: 30,
              //   width: 30,
              //   excavate: true,
              // }}
              className="block my-2 md:hidden"
            />
            <Image
              src="/assets/qr/frame02.png"
              alt="bottom"
              width={300}
              height={200}
            />
          </div>
          <div className="mt-2 ">
            <div className="text-sm text-gray-500">
              <h1 className="font-bold">หมายเลขที่จอง</h1>
              <p>{booking.id}</p>
            </div>
            <div className="text-sm text-gray-500">
              <h1 className="font-bold">จำนวนเงินที่ต้องชำระ</h1>
              <p>{THB(booking.totalPrice)}</p>
            </div>
          </div>
        </div>
        {/* <Separator orientation="vertical" /> */}
        <div className="md:col-span-2">
          <Dropzone bookingId={booking.id} amount={booking.totalPrice} />
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
