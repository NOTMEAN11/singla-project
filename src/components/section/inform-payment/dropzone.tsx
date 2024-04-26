"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { X, XIcon } from "lucide-react";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
// import { Input } from "./ui/input";
type Props = {
  amount: number;
  bookingId: string;
};
function Dropzone({ amount, bookingId }: Props) {
  const router = useRouter();
  const [files, setFiles] = useState<any[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    },
    maxSize: 1048576,
  });

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.set("file", files[0]);

    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "x-amount": `${amount}`,
        "x-booking-id": `${bookingId}`,
      },
      body: formData,
    });
    const data = await res.json();

    if (data.status === "error") {
      setFiles([]);
      return toast.error(data.message);
    }

    if (!res.ok) {
      setFiles([]);
      return toast.error(data.message);
    }

    toast.success(data.message);
    return router.push("/payment/search-booking?bookingId=" + bookingId);
  }

  function handleDelete(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  return (
    <form onSubmit={handleUpload}>
      <h1 className="my-2">อัพโหลดไฟล์</h1>
      <div
        {...getRootProps({
          className: `border border-dashed border-gray-300 p-4 h-[300px] flex items-center justify-center rounded-md w-full h-full ${
            isDragActive ? "bg-gray-100" : ""
          }`,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p className="cursor-pointer">
            ลากไฟล์ หรือ คลิกเพื่อทำการอัพโหลดรูปภาพ
          </p>
        )}
      </div>
      <div className="my-4 ">
        <h1 className="my-2">ตัวอย่างรูปภาพ</h1>
        {files && files.length === 0 && (
          <div className="flex items-center justify-center w-full h-64 border border-dashed">
            <div className="text-gray-500">ไม่มีไฟล์</div>
          </div>
        )}
        {files.map((file) => (
          <div
            key={file.name}
            className="≈ w-full h-64 border border-dashed flex items-center justify-center"
          >
            <div className="relative w-32 h-64">
              <Image
                src={file.preview}
                alt={file.name}
                fill
                className="object-contain "
              />
              <div
                className="absolute top-[-4px] right-[-8px] p-0 text-white bg-red-500 rounded-full cursor-pointer"
                onClick={() => handleDelete(file.name)}
              >
                <XIcon size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full my-1" variant="outline">
        แจ้งการชำระเงิน
      </Button>
    </form>
  );
}

export default Dropzone;
