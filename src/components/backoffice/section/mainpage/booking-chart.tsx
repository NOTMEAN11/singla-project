"use client";
import { Card, CardContent } from "@/components/ui/card";
import { THB, cn } from "@/lib/utils";
import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Line,
  LineChart,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";

type Props = {
  className?: string;
  data: { name: string; totalBooking: number; totalRevenue: number }[];
};

function BookingChart({ className, data }: Props) {
  return (
    <Card className={cn(className, "rounded p-4 ")}>
      <h1 className="font-bold">สรุปรายเดือน</h1>
      <p className="text-xs text-muted-foreground">
        ยอดเข้าพักทั้งหมด และยอดรายได้รายเดือน
      </p>
      <CardContent className="flex items-center justify-center gap-4 text-sm">
        <div className="mt-4 h-[300px] w-1/2 border rounded">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2 border rounded-lg shadow-sm bg-background">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              ยอดเข้าพักทั้งหมด
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value} ครั้ง
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Legend
                content={
                  <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-primary"></div>
                      <p>ยอดเข้าพักทั้งหมด</p>
                    </div>
                  </div>
                }
              />
              <Bar
                dataKey="totalBooking"
                style={
                  {
                    fill: "var(--theme-primary)",
                    opacity: 1,
                    "--theme-primary": "hsl(var(--primary))",
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 h-[300px] w-1/2 border rounded">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 20,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-2 border rounded-lg shadow-sm bg-background">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              รายได้รวม
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {THB(payload[0].value as number)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Legend
                content={
                  <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-primary"></div>
                      <p>รายได้รวม</p>
                    </div>
                  </div>
                }
              />
              <Bar
                dataKey="totalRevenue"
                style={
                  {
                    fill: "var(--theme-primary)",
                    opacity: 1,
                    "--theme-primary": "hsl(var(--primary))",
                  } as React.CSSProperties
                }
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default BookingChart;
