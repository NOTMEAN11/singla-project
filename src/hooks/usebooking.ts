import { Booking, Guest, RoomType } from "@/types/booking";
import { set } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BookingStoreActions = {
  room: string | null;
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
  guest: Guest | null;
  fee: number;
  options: {
    buffet: boolean;
    shuttle: boolean;
  };
  setRoom: (room: string) => void;
  setCheckInDate: (date: Date | undefined) => void;
  setCheckOutDate: (date: Date | undefined) => void;
  setGuest: (guest: Guest) => void;
  setOptions: (options: { buffet: boolean; shuttle: boolean }) => void;
  reset: () => void;
};
const fee = 500; // TODO: เพิ่มค่าบริการจาก Server
const today = new Date();
const tomorrow = new Date(today);

const useBookingStore = create<BookingStoreActions>()(
  persist(
    (set, get) => ({
      room: null,
      checkInDate: today,
      checkOutDate: tomorrow,
      guest: { adults: 0, children: 0 },
      fee,
      options: {
        buffet: false,
        shuttle: false,
      },
      setRoom: (room: string) => {
        set((state) => ({ ...state, room }));
      },
      setCheckInDate: (date: Date | undefined) => {
        set((state) => ({ ...state, checkInDate: date }));
      },
      setCheckOutDate: (date: Date | undefined) => {
        set((state) => ({ ...state, checkOutDate: date }));
      },
      setGuest: (guest: Guest) => {
        set((state) => ({ ...state, guest }));
      },
      setOptions: (options: { buffet: boolean; shuttle: boolean }) => {
        set((state) => ({ ...state, options }));
      },
      reset: () => {
        set((state) => ({
          ...state,
          room: null,
          checkInDate: undefined,
          checkOutDate: undefined,
          guest: null,
        }));
      },
    }),
    { name: "booking" }
  )
);

export default useBookingStore;
