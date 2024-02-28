import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertStringToDate(dateString: string) {
  const parts = dateString.split("/");

  const year = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[0], 10);

  const date = new Date(year, month, day);

  return date;
}

export function THB(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(amount);
}

export function formatPhoneNumber(phoneNumber: string) {
  return (
    phoneNumber.slice(0, 3) +
    "-" +
    phoneNumber.slice(3, 6) +
    "-" +
    phoneNumber.slice(6)
  );
}
