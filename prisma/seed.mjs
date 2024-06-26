import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function main() {
  const admin = await prisma.admin.create({
    data: {
      name: "admin",
      email: "admin@singlaresort.com",
      password: await hashPassword("admin"),
    },
  });

  const roomType = await prisma.roomType.createMany({
    data: [
      {
        name: "SUPERIOR ROOM",
        price: 500,
        capacity: 2,
        description:
          "ห้องพักสำหรับ 2 ท่าน พร้อมเฟอร์นิเจอร์ครบครัน และวิวทะเลสวยงาม",
        image: ["/assets/rooms/room1.2.jpg"],
        slug: "superior-room",
      },
      {
        name: "DELUXE ROOM",
        price: 1000,
        capacity: 2,
        description:
          "ห้องพักสำหรับ 2 ท่าน พร้อมเฟอร์นิเจอร์ครบครัน และวิวทะเลสวยงาม",
        image: ["/assets/rooms/room2.2.jpg"],
        slug: "deluxe-room",
      },
      {
        name: "FAMILY ROOM",
        price: 2000,
        capacity: 5,
        description:
          "ห้องพักสำหรับ 5 ท่าน พร้อมเฟอร์นิเจอร์ครบครัน และวิวทะเลสวยงาม",
        image: ["/assets/rooms/room3.jpg"],
        slug: "family-room",
      },
      {
        name: "POOL SUITE",
        price: 5000,
        capacity: 8,
        description:
          "ห้องพักสำหรับ 8 ท่าน พร้อมเฟอร์นิเจอร์ครบครัน และวิวทะเลสวยงาม และสระว่ายน้ำส่วนตัว",
        image: ["/assets/rooms/room4.2.jpg"],
        slug: "pool-suite",
      },
    ],
  });

  const type = await prisma.roomType.findMany({});

  if (!type) return;

  const rooms = await prisma.room.createMany({
    data: [
      { name: "A101", roomTypeId: type[0].id },
      { name: "A102", roomTypeId: type[0].id },
      { name: "A103", roomTypeId: type[0].id },
      { name: "A104", roomTypeId: type[0].id },
      { name: "A105", roomTypeId: type[0].id },
      { name: "B201", roomTypeId: type[1].id },
      { name: "B202", roomTypeId: type[1].id },
      { name: "B203", roomTypeId: type[1].id },
      { name: "B204", roomTypeId: type[1].id },
      { name: "B205", roomTypeId: type[1].id },
      { name: "C301", roomTypeId: type[2].id },
      { name: "C302", roomTypeId: type[2].id },
      { name: "C303", roomTypeId: type[2].id },
      { name: "C304", roomTypeId: type[2].id },
      { name: "C305", roomTypeId: type[2].id },
      { name: "D401", roomTypeId: type[3].id },
      { name: "D402", roomTypeId: type[3].id },
    ],
  });

  const faqs = await prisma.faq.createMany({
    data: [
      {
        question:
          "SINGLA รีสอร์ท สามารถเลื่อนการเข้าพักได้หรือไม่? มีค่าใช้จ่ายเพิ่มเติมหรือไม่?",
        answer:
          "หากคุณทำการจองผ่านเว็บไซด์ของรีสอร์ท คุณสามารถเลื่อนวันเข้าพักผ่านเว็บไซด์ของรีสอร์ทได้ ขึ้นอยู่กับข้อกำหนดและเงื่อนไขของโปรโมชั่นที่ระบุในการจองของคุณ สำหรับการจองผ่านช่องทางอื่นๆ ต้องทำการยกเลิกผ่านช่องทางนั้นเท่านั้น",
      },
      {
        question: "เวลาเช็คอินและเช็คเอาท์ ของ SINGLA รีสอร์ท?",
        answer: "เช็คอินเวลา 14.00 น. เช็คเอ๊าท์เวลา 12.00 น.",
      },
      {
        question: "ให้บริการอาหารเช้าที่ใหน ตั้งแต่เวลากี่โมง?",
        answer:
          "บุฟเฟ่ต์อาหารเช้าให้บริการที่ห้องเฮอลิเทจ คาเฟ่ ชั้นล๊อบบี้ ตั้งแต่เวลา 06.00 - 10.00 น.",
      },
      {
        question: "ราคาที่แสดงบนเว็บไซด์เป็นราคาก่อนหรือหลังลดราคาแล้ว?",
        answer:
          "ราคาที่แสดงบนเว็บไซด์เป็นราคาที่ลดราคาแล้ว โดยไม่มีค่าใช้จ่ายเพิ่มเติมอื่นๆ และค่าธรรมเนียมการจองใดๆ อีก เมื่อทำการจองผ่านเว็บไซด์ของโรงแรม",
      },
    ],
  });

  const coupon = await prisma.coupon.createMany({
    data: [
      {
        total: 100,
        description: "ส่วนลด 10% สำหรับการจองห้องพัก",
        code: "10SINGLA2024",
        discount: 0.1,
        endDate: new Date("2024-12-31"),
      },
      {
        total: 100,
        description: "ส่วนลด 15% สำหรับการจองห้องพัก",
        code: "15SINGLA2024",
        discount: 0.15,
        endDate: new Date("2024-12-31"),
      },
    ],
  });

  const promotion = await prisma.promotion.createMany({
    data: [
      {
        name: "นาทีสุดท้าย",
        description:
          "ราคาดีที่สุดสำหรับการพักผ่อนที่มหาครเมืองสงขลา ที่พักในฝันสำหรับวันหยุดในเมือง",
        image: "/assets/imgpromotions/promotions1.jpg",
        slug: "last-minute",
        content: "",
      },
      {
        name: "แพ็กเกจ",
        description:
          "คลื่นแห่งการเฉลิมฉลอง: การเดินทางที่เต็มอิ่ม พบประสบการณ์สุดพิเศษกับแพ็คเกจซิกเนเจอร์ ในโอกาสครบรอบ",
        image: "/assets/imgpromotions/promotions2.jpg",
        slug: "package",
        content: "",
      },

      {
        name: "ห้องพักและอาหารเช้า",
        description: "SINGLA ช่วงเวลาดีดีแห่งความสุขตรงนี้ของคุณ",
        image: "/assets/imgpromotions/promotions3.jpg",
        slug: "room-breakfast",
        content: "",
      },
      {
        name: "ยิ่งพักนาน ยิ่งคุ้ม",
        description:
          "ยิ่งพักนาน ยิ่งคุ้ม พลาดไม่ได้กับข้อเสนอยิ่งพักนาน ยิ่งคุ้ม",
        image: "/assets/imgpromotions/promotions4.jpg",
        slug: "longer-stay",
        content: "",
      },
      {
        name: "ข้อเสนอห้องพัก",
        description:
          "พักก่อน จ่ายทีหลัง ผ่อนชำระแบบไม่มีดอกเบี้ย สำหรับผู้ถือบัตรที่ร่วมรายการ",
        image: "/assets/imgpromotions/promotions5.jpg",
        slug: "room-offers",
        content: "",
      },
      {
        name: "ดินเนอร์สุดโรแมนติก​",
        description:
          "เฉลิมฉลองความโรแมนติกในขณะที่ค้นพบอาหารค่ำสุดโรแมนติกกับคนสำคัญของคุณ",
        image: "/assets/imgpromotions/promotions6.jpg",
        slug: "romantic-dinner",
        content: "",
      },
    ],
  });
}

main()
  .then(() => console.log("Seed data created"))
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
