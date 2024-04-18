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
import { Coupon } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";
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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import EditCouponDialog from "../dialog/coupon/edit";

function CouponSection() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  async function deleteCoupon(id: string) {
    const res = await fetch(`/api/promotions/coupon/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    }

    setCoupons(coupons.filter((coupon) => coupon.id !== id));
    return toast.success(data.message);
  }

  useEffect(() => {
    fetch("/api/promotions/coupon")
      .then((res) => res.json())
      .then((data) => {
        setCoupons(data);
        setLoading(false);
      });
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>คูปอง</TableHead>
          <TableHead>ส่วนลด</TableHead>
          <TableHead>จำนวนคงเหลือ</TableHead>
          <TableHead>วันที่หมดอายุ</TableHead>
          <TableHead>คำอธิบาย</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              กำลังโหลดข้อมูล...
            </TableCell>
          </TableRow>
        )}
        {!loading && coupons.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              ไม่มีข้อมูล
            </TableCell>
          </TableRow>
        )}
        {coupons.map((coupon, index) => (
          <TableRow key={coupon.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{coupon.code}</TableCell>
            <TableCell>{coupon.discount}</TableCell>
            <TableCell>{coupon.total}</TableCell>
            <TableCell>
              <Badge>
                {format(coupon.endDate, "LLL dd, y", {
                  locale: th,
                })}
              </Badge>
            </TableCell>
            <TableCell>{coupon.description}</TableCell>
            <TableCell>
              <div className="space-x-2">
                <EditCouponDialog data={coupon} id={coupon.id} />
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
                        onClick={() => deleteCoupon(coupon.id)}
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
      </TableBody>
    </Table>
  );
}

export default CouponSection;
