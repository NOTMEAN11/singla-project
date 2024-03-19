import PageHeader from "@/components/backoffice/pageheader/pageheader";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function BackofficeMainPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/backoffice/signin");
  }
  return (
    <PageWrapper>
      <PageHeader breadcrumb={[]} title="ภาพรวม" />
    </PageWrapper>
  );
}

export default BackofficeMainPage;
