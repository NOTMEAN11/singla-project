import React from "react";
import Image from "next/image";
import Link from "next/link";

function SelectSection() {
  return (
    <React.Fragment>
      <div className="grid justify-items-center items-center grid-cols-2 ">
        <div className="max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow">
          <Link href={"#"}>
            <Image
              className="rounded-t-lg"
              src={"/assets/room1.jpg"}
              alt={"404"}
              width={1400}
              height={500}
            />
          </Link>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">
              TODO:ชื่อห้อง
            </h5>
            <p className="mb-2 text-2xl font-bold tracking-tight">
              TODO:รายละเอียดห้อง
            </p>
          </div>
        </div>
        <div className="max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow">
          <Link href={"#"}>
            <Image
              className="rounded-t-lg"
              src={"/assets/room1.jpg"}
              alt={"404"}
              width={1400}
              height={500}
            />
          </Link>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">
              TODO:ชื่อห้อง
            </h5>
            <p className="mb-2 text-2xl font-bold tracking-tight">
              TODO:รายละเอียดห้อง
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SelectSection;
