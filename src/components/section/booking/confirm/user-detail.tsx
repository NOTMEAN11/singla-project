"use client";

import React from "react";
import { formatPhoneNumber } from "@/lib/utils";

function ConfirmUserDetail() {
  const phone = formatPhoneNumber("0999999999");

  return (
    <div className="p-2 border rounded-md text-xs my-4 space-y-1">
      <h1 className=" font-bold mb-2 text-sm">ข้อมูลผู้จอง</h1>
      <div className="grid grid-cols-2">
        <h1 className="font-bold">ชื่อ-นามสกุล</h1>
        <p>test test</p>
      </div>
      <div className="grid grid-cols-2">
        <h1 className="font-bold">อีเมล</h1>
        <p>test@test.com</p>
      </div>
      <div className="grid grid-cols-2">
        <h1 className="font-bold">เบอร์โทรศัพท์</h1>
        <p>{phone}</p>
      </div>
    </div>
  );
}

export default ConfirmUserDetail;
