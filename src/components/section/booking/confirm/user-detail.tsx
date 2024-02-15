"use client";

import React from "react";
import { formatPhoneNumber } from "@/lib/utils";
import useBookingInfo from "@/hooks/usebooking-info";

function ConfirmUserDetail() {
  const { name, email, phone } = useBookingInfo();

  return (
    <div className="p-2 my-4 space-y-1 text-xs border rounded-md">
      <h1 className="mb-2 text-sm font-bold ">ข้อมูลผู้จอง</h1>
      <div className="grid grid-cols-2">
        <h1 className="font-bold">ชื่อ-นามสกุล</h1>
        <p>{name}</p>
      </div>
      <div className="grid grid-cols-2">
        <h1 className="font-bold">อีเมล</h1>
        <p>{email}</p>
      </div>
      <div className="grid grid-cols-2">
        <h1 className="font-bold">เบอร์โทรศัพท์</h1>
        <p>{formatPhoneNumber(phone)}</p>
      </div>
    </div>
  );
}

export default ConfirmUserDetail;
