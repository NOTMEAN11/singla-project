"use client";
import { Button } from "@/components/ui/button";
import { Folder, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type FolderCardProps = {
  name: string;
  totalFile: number;
  href: string;
  onClick?: () => void;
};

type ImageCardProps = {
  name: string;
  src: string;
  onClick?: () => void;
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

function FolderCard({ name, totalFile, href, onClick }: FolderCardProps) {
  return (
    <div className="relative w-64 h-64 p-2 border rounded-md">
      <Link href={"/backoffice/image/" + href}>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Folder size={60} />
          <h1 className="text-xs font-bold">{name}</h1>
          <p className="text-xs">{totalFile} ไฟล์</p>
        </div>
      </Link>
      <div
        className={cn(
          "absolute top-[-5px] right-[-5px] text-white cursor-pointer p-1 rounded-full bg-red-500",
          name === "bgs" && "hidden",
          name === "imgpromotions" && "hidden",
          name === "placeholders" && "hidden",
          name === "rooms" && "hidden",
          name === "slips" && "hidden",
          name === "qr" && "hidden"
        )}
        onClick={onClick}
      >
        <X size={10} className="" />
      </div>
    </div>
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

function ImageSection() {
  const [directories, setDirectories] = useState<TDirectories[]>([]);
  const [files, setFiles] = useState<TFiles[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function handleDeleteFile(name: string) {
    const res = await fetch("/api/assets?type=file", {
      method: "DELETE",
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.message);

    if (data.status === "success") {
      setFiles(files.filter((file) => file.name !== name));
      return toast.success(data.message);
    }
  }

  async function handleDeleteDirectory(name: string) {
    const res = await fetch("/api/assets?type=folder", {
      method: "DELETE",
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    if (!res.ok) return toast.error(data.message);

    if (data.status === "success") {
      setDirectories(directories.filter((dir) => dir.name !== name));
      return toast.success(data.message);
    }
  }

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => res.json())
      .then((data) => {
        setDirectories(data.directories);
        setFiles(data.files);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4 ">
      {loading && (
        <div className="col-span-6 p-4 text-center">กำลังโหลดข้อมูล...</div>
      )}
      {!loading && directories.length === 0 && files.length === 0 && (
        <div className="col-span-6 p-4 text-center">ไม่พบข้อมูล</div>
      )}
      {directories.map((directory, index) => (
        <FolderCard
          key={index}
          name={directory.name}
          totalFile={directory.files.length}
          href={directory.name}
          onClick={() => handleDeleteDirectory(directory.name)}
        />
      ))}
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
