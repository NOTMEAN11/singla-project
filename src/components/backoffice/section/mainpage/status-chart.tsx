"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

function StatusChart({ data }: Props) {
  //   const data = [
  //     { name: "Availability", value: 5 },
  //     { name: "Housekeeping", value: 5 },
  //     { name: "Maintenance", value: 5 },
  //     { name: "Unspecified", value: 2 },
  //   ];

  const COLORS = ["#22c55e", "#0ea5e9", "#eab308", "#ef4444"];

  return (
    <Card className="w-full rounded">
      <CardContent>
        <p className="mt-4 font-bold">สถานะห้องพัก</p>
        <p className="text-xs text-muted-foreground">สรุปสถานะห้องพักทั้งหมด</p>
        <div className="h-[265px] flex items-center justify-center flex-col">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={250} height={250}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2 border rounded-lg shadow-sm bg-background">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              จำนวนห้องที่{payload[0].payload.name}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value} ห้อง
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex items-center mx-4 space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <p>ว่าง</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <p>ทำความสะอาด </p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <p>ซ่อมบำรุง</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <p>ไม่ระบุ</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatusChart;
