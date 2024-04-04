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

type Props = {
  placeholder?: string;
  data: any[];
  icon?: React.ReactNode;
  className?: string;
  fn?: (value: string) => void;
};

export function Combobox({ placeholder, data, className, icon, fn }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    fn && fn(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  console.log(value);
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
            ? data.find((i) => i.id || i.name === value)?.name
            : (
                <span className="flex items-center ">
                  {icon} <p>{placeholder}</p>
                </span>
              ) || "โปรดเลือก"}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-w-56">
        <Command>
          <CommandInput placeholder={placeholder || "โปรดเลือก"} />
          <CommandEmpty>ไม่พบข้อมูล</CommandEmpty>
          <CommandGroup>
            {data.map((i) => (
              <CommandItem
                key={i.id}
                value={i.id}
                onSelect={(currentValue) => {
                  console.log("currentValue => ", currentValue);
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
