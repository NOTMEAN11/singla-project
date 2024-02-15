import { z } from "zod";
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

const schema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number(),
  children: z.number(),
  isBuffet: z.boolean(),
  isPickup: z.boolean(),
  feePrice: z.number().default(500),
  discountPrice: z.number(),
  totalPrice: z.number(),
  status: z.string().default("pending"),
  request: z.string().optional(),
  roomId: z.string().optional(),
  roomTypeId: z.string().optional(),
});

export type Room = z.infer<typeof schema>;
export { schema as bookingSchema };

export type { Step, RoomType, Guest, Booking };
