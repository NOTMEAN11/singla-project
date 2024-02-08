import { RoomType } from "@/types/booking";

const menu = [
  { name: "โปรโมชั่น", Link: "/promotions" },
  { name: "ติดต่อเรา", Link: "/contact-us" },
];

const room = [
  { name: "ห้องสุพรีเรียร์", Link: "/rooms/1" },
  { name: "ห้องดีลักซ์", Link: "/rooms/2" },
  { name: "ทั้งหมด", Link: "/rooms" },
];

const roomtype: RoomType[] = [
  {
    id: "1",
    name: "SUPERIOR ROOM",
    price: 1500,
    desc: "ห้องพักแบบสุดคุ้ม พร้อมอุปกรณ์ครบครัน พักได้สูงสุด 2 ท่าน",
    image: ["/assets/rooms/room1.2.jpg"],
    slug: "superior-room",
  },
  {
    id: "2",
    name: "DELUXE ROOM",
    price: 2000,
    desc: "ห้องพักแบบสุดหรู พร้อมอุปกรณ์ครบครัน พักได้สูงสุด 2 ท่าน",
    image: ["/assets/rooms/room2.2.jpg"],
    slug: "deluxe-room",
  },
  {
    id: "3",
    name: "FAMILY ROOM",
    price: 3000,
    desc: "ห้องพักแบบสุดคุ้ม พร้อมอุปกรณ์ครบครัน พักได้สูงสุด 4 ท่าน",
    image: ["/assets/rooms/room3.jpg"],
    slug: "family-room",
  },
  {
    id: "4",
    name: "POOL SUITE",
    price: 4000,
    desc: "ห้องพักแบบสุดหรู พร้อมอุปกรณ์ครบครัน พักได้สูงสุด 2 ท่าน",
    image: ["/assets/rooms/room4.2.jpg"],
    slug: "pool-suite",
  },
];

export { menu, room, roomtype };
