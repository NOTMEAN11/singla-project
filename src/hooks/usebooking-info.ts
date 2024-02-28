import { create } from "zustand";
import { persist } from "zustand/middleware";

type BookingInfoAction = {
  name: string;
  email: string;
  phone: string;
  coupon: string;
  request?: string;
  setInfo: (info: {
    name: string;
    email: string;
    phone: string;
    coupon?: string;
    request?: string;
  }) => void;
  reset: () => void;
};

const useBookingInfo = create<BookingInfoAction>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      phone: "",
      coupon: "",
      request: "",
      setInfo: (info) => {
        set((state) => ({ ...state, ...info }));
      },
      reset: () => {
        set((state) => ({
          ...state,
          name: "",
          email: "",
          phone: "",
          coupon: "",
          request: "",
        }));
      },
    }),
    { name: "info" }
  )
);

export default useBookingInfo;
