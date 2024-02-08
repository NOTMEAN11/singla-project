type Step = "rooms" | "details" | "confirm" | "complete";

type RoomType = {
  id: string;
  name: string;
  price: number;
  image: string[];
  desc: string;
  slug: string;
};

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
