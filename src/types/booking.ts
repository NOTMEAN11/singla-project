import { RoomType } from "./room-type";

type Step = "rooms" | "details" | "confirm" | "complete";

type Guest = {
  adults: number;
  children: number;
};

type Booking = {
  room: RoomType;
  checkInDate: Date;
  checkOutDate: Date;
  guest: Guest;
};

export type { Step, RoomType, Guest, Booking };
