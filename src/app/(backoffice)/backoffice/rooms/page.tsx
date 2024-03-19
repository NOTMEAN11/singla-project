import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import React from "react";

function RoomsPage() {
  return (
    <PageWrapper>
      <PageHeader
        breadcrumb={[{ title: "ห้องพัก", path: "/backoffice/rooms" }]}
        title="ห้องพัก"
      />
    </PageWrapper>
  );
}

export default RoomsPage;
