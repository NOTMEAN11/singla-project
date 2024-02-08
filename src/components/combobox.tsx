"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RoomType } from "@/types/booking";

type Props = {
  placeholder?: string;
  data: RoomType[];
  icon?: React.ReactNode;
  className?: string;
  fn?: (value: string) => void;
};

export function Combobox({ placeholder, data, className, icon, fn }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    fn && fn(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full max-w-56 justify-between text-xs", className)}
        >
          {value
            ? data.find((i) => i.id === value)?.name
            : (
                <span className="flex items-center ">
                  {icon} <p>{placeholder}</p>
                </span>
              ) || "โปรดเลือก"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-56 p-0">
        <Command>
          <CommandInput placeholder={placeholder || "โปรดเลือก"} />
          <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
          <CommandGroup>
            {data.map((i) => (
              <CommandItem
                key={i.id}
                value={i.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === i.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {i.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
