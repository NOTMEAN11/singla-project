import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Font,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";
import "./style.css";
import { THB } from "@/lib/utils";

type Props = {
  name?: string;
  userImage?: string;
  userEmail?: string;
  title: string;
  bookingId: string;
  checkIn: string;
  checkOut: string;
  totalGuest: { adult: number; child: number };
  roomType: string;
  discount: number;
  total: number;
  link: string;
};

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const SinglaBooking = ({
  name,
  userImage,
  userEmail,
  title,
  bookingId,
  checkIn,
  checkOut,
  totalGuest,
  roomType,
  discount,
  total,
  link,
}: Props) => {
  const previewText = `เรียนคุณ ${name}`;

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Noto Sans Thai"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;700&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="px-2 mx-auto my-auto font-sans bg-white">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Text className="text-5xl font-bold text-center">SINGLA</Text>
            </Section>
            <Heading className="p-0 mx-0 text-sm font-bold text-center text-black">
              {title}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              เรียนคุณ {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              ทางเราได้รับข้อมูลการจองห้องพักของท่านจาก<strong> SINGLA</strong>{" "}
              ท่านสามารถตรวจสอบข้อมูลการจองและชำระเงินได้ข้างล่างนี้.
            </Text>
            <Section style={informationTable}>
              <Row style={informationTableRow}>
                <Column colSpan={2}>
                  <Section>
                    <Row>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>หมายเลขที่จอง</Text>
                        <Link
                          style={{
                            ...informationTableValue,
                            color: "#15c",
                            textDecoration: "underline",
                          }}
                        >
                          {bookingId}
                        </Link>
                      </Column>
                    </Row>

                    <Row>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>
                          วันที่เช็คอิน-เอ้าท์
                        </Text>
                        <Text style={informationTableValue}>
                          {checkIn} - {checkOut}
                        </Text>
                      </Column>
                    </Row>

                    <Row>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>
                          จำนวนผู้เข้าพัก
                        </Text>
                        <Text style={informationTableValue}>
                          ผู้ใหญ่ {totalGuest.adult} คน{" "}
                          {totalGuest.child
                            ? `, เด็ก ${totalGuest.child} คน`
                            : ""}
                        </Text>
                      </Column>
                      <Column style={informationTableColumn}>
                        <Text style={informationTableLabel}>ประเภทห้องพัก</Text>
                        <Text style={informationTableValue}>{roomType}</Text>
                      </Column>
                    </Row>
                  </Section>
                </Column>
                <Column style={informationTableColumn} colSpan={2}>
                  <Text style={informationTableLabel}>ส่วนลด</Text>
                  <Text style={informationTableValue} className="text-red-500">
                    {THB(discount)}
                  </Text>
                  <br />
                  <Text style={informationTableLabel}>ราคารวมภาษี</Text>
                  <Text style={informationTableValue}>{THB(total)}</Text>
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={link}
              >
                ชำระเงิน
              </Button>
            </Section>
            <Text className="text-black text-xs leading-[24px]">
              หากท่านมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติม กรุณาติดต่อเราที่
              02-123-4567
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              อีเมลนี้ถูกส่งจากระบบอัตโนมัติ กรุณาอย่าตอบกลับ
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const informationTable = {
  borderCollapse: "collapse" as const,
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  height: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  height: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

SinglaBooking.PreviewProps = {
  name: "alan turing",
  userImage: `${baseUrl}/static/vercel-user.png`,
  userEmail: "test@test.com",
  title: "ชำระเงินค่าห้องพัก",
  bookingId: "123456789",
  checkIn: "2021/12/01",
  checkOut: "2021/12/02",
  totalGuest: { adult: 2, child: 1 },
  roomType: "Standard",
  discount: 100,
  total: 1000,
  link: "#",
} as Props;

export default SinglaBooking;
