import PageHeader from "@/components/pageheader/pageheader";

import InformCheck from "@/components/section/inform-payment/check-form";

import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";

function InformPaymentPage() {
  return (
    <PageWrapper className="mt-20">
      <ContainerWrapper>
        <PageHeader
          title="แจ้งการชำระเงิน"
          breadcrumb={[
            { title: "ชำระเงิน", path: "/payment" },
            { title: "แจ้งการชำระเงิน", path: "/payment/inform-payment" },
          ]}
          //   disableTitle
        />
        <div>
          <InformCheck />
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default InformPaymentPage;
