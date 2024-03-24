import { findDateMonth } from "./utils";

export function calculateMonthlyStats(
  data: {
    checkIn: Date;
    totalPrice: number;
  }[]
) {
  const bookingChart = [];
  const months = [
    { name: "ม.ค.", value: 1 },
    { name: "ก.พ.", value: 2 },
    { name: "มี.ค.", value: 3 },
    { name: "เม.ย.", value: 4 },
    { name: "พ.ค.", value: 5 },
    { name: "มิ.ย.", value: 6 },
    { name: "ก.ค.", value: 7 },
    { name: "ส.ค.", value: 8 },
    { name: "ก.ย.", value: 9 },
    { name: "ต.ค.", value: 10 },
    { name: "พ.ย.", value: 11 },
    { name: "ธ.ค.", value: 12 },
  ];
  for (let i = 0; i <= 11; i++) {
    const filteredData = data.filter(
      (booking) => findDateMonth(booking.checkIn) === i
    );
    const totalBooking = filteredData.length;
    const totalRevenue = filteredData.reduce((acc, curr) => {
      return acc + curr.totalPrice;
    }, 0);
    bookingChart.push({
      name: months[i]?.name,
      totalBooking,
      totalRevenue,
    });
  }

  return bookingChart;
}
