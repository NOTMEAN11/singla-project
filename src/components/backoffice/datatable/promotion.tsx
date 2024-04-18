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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";

import { Promotion } from "@prisma/client";
import { Edit2, Trash2, View } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function PromotionSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  async function deletePromotion(id: string) {
    const res = await fetch(`/api/promotions/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    }

    setPromotions(promotions.filter((promotion) => promotion.id !== id));
    return toast.success(data.message);
  }

  useEffect(() => {
    fetch("/api/promotions")
      .then((res) => res.json())
      .then((data) => {
        setPromotions(data);
        setLoading(false);
      });
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>ชื่อ</TableHead>
          <TableHead>คำอธิบาย</TableHead>
          <TableHead>SLUG</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {promotions.map((promotion, index) => (
          <TableRow key={promotion.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{promotion.name}</TableCell>
            <TableCell>{promotion.description}</TableCell>
            <TableCell>
              <Badge>{promotion.slug}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Link href={`/backoffice/promotion/${promotion.id}`}>
                  <Edit2 size={14} />
                </Link>
                <Link href={`/promotions/${promotion.slug}`} target="_blank">
                  <View size={14} />
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 size={14} />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        คุณต้องการที่จะลบใช่หรือไม่?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        หากลบแล้วจะไม่สามารถกู้คืนได้ และข้อมูลจะถูกลบออกจากระบบ
                        คุณแน่ใจที่จะลบหรือไม่?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deletePromotion(promotion.id)}
                      >
                        ยืนยัน
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {!loading && promotions.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              ไม่พบข้อมูล
            </TableCell>
          </TableRow>
        )}
        {loading && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              กำลังโหลด...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default PromotionSection;
