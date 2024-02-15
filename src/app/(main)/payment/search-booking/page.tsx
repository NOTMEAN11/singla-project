import React from "react";
import db from "@/configs/db";
import PageHeader from "@/components/pageheader/pageheader";
import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import { Input } from "@/components/ui/input";
import SearchBookingSection from "@/components/section/search-booking/search";

function SearchBookingPage() {
  return (
    <PageWrapper className="mt-20">
      <ContainerWrapper>
        <PageHeader
          title="ค้นหาหมายเลขที่จอง"
          breadcrumb={[
            { title: "ชำระเงิน", path: "/payment" },
            { title: "ค้นหาหมายเลขที่จอง", path: "/payment/search-booking" },
          ]}
          //   disableTitle
        />
        <div>
          <SearchBookingSection />
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default SearchBookingPage;
