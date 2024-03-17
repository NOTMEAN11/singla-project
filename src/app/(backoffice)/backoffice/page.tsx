import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import React from "react";

function BackofficeMainPage() {
  return (
    <PageWrapper>
      <PageHeader breadcrumb={[]} title="ภาพรวม" />
    </PageWrapper>
  );
}

export default BackofficeMainPage;
