"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Folder, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type FolderCardProps = {
  name: string;
  totalFile: number;
  href: string;
};

type ImageCardProps = {
  name: string;
  src: string;
  onClick: () => void;
};

type TDirectories = {
  name: string;
  path: string;
  files: string[];
};

type TFiles = {
  name: string;
  path: string;
};

function FolderCard({ name, totalFile, href }: FolderCardProps) {
  return (
    <Link
      href={"/backoffice/image/" + href}
      className="w-64 h-64 p-4 border rounded-md"
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Folder size={60} />
        <h1 className="text-xs font-bold">{name}</h1>
        <p className="text-xs">{totalFile} ไฟล์</p>
      </div>
    </Link>
  );
}

function ImageCard({ name, src, onClick }: ImageCardProps) {
  return (
    <div className="relative w-64 h-64 p-2 border rounded-md">
      <Link href={src} target="_blank">
        <div className="flex flex-col items-center justify-center w-full h-full ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={src}
                  alt={name}
                  fill
                  className="object-contain w-full h-full p-2"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Link>
      <div
        className={cn(
          "absolute top-[-5px] right-[-5px] text-white cursor-pointer p-1 rounded-full bg-red-500",
          name === ".keep" && "hidden"
        )}
        onClick={onClick}
      >
        <X size={10} className="" />
      </div>
    </div>
  );
}

type Props = {
  data: string;
};

function ImageSection({ data }: Props) {
  const [files, setFiles] = useState<TFiles[]>([]);
  const [loading, setLoading] = useState(true);

  async function handleDeleteFile(name: string) {
    const res = await fetch("/api/assets/" + data, {
      method: "DELETE",
      body: JSON.stringify({ name }),
    });

    const json = await res.json();
    if (!res.ok) return toast.error(json.message);

    if (json.status === "success") {
      setFiles(files.filter((file) => file.name !== name));
      return toast.success(json.message);
    }
  }

  useEffect(() => {
    fetch("/api/assets/" + data)
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 ">
      {loading && (
        <div className="col-span-6 p-4 text-center">กำลังโหลดข้อมูล...</div>
      )}
      {!loading && files.length === 0 && (
        <div className="col-span-6 p-4 text-center">ไม่พบข้อมูล</div>
      )}
      {files.map((file, index) => (
        <ImageCard
          key={index}
          name={file.name}
          src={file.path}
          onClick={() => handleDeleteFile(file.name)}
        />
      ))}
    </div>
  );
}

export default ImageSection;
