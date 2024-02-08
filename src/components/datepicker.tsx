"use client";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, convertStringToDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { th } from "date-fns/locale/th";
import useBookingStore from "@/hooks/usebooking";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

export function DatePicker({}: Props) {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal text-xs",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={th}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { setCheckInDate, setCheckOutDate } = useBookingStore();

  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 1),
  });

  useEffect(() => {
    setCheckInDate(date?.from);
    setCheckOutDate(date?.to);
  }, [date, setCheckInDate, setCheckOutDate]);

  console.log(date);

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full max-w-72 justify-start text-left font-normal text-xs",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: th })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: th })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: th })
              )
            ) : (
              <span className="text-black font-medium">
                โปรดเลือกวันที่เช็คอิน - เช็คเอ้าท์
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            locale={th}
            numberOfMonths={2}
            className="hidden lg:block"
          />
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            locale={th}
            numberOfMonths={1}
            className="lg:hidden block"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
