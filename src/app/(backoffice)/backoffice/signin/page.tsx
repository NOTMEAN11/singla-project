import PageHeader from "@/components/backoffice/pageheader/pageheader";
import SignIn from "@/components/backoffice/signIn";
import PageWrapper from "@/components/backoffice/wrapper/page-wrapper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function BackofficeSignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect("/backoffice");
  }
  return (
    <PageWrapper>
      <div className="flex items-center justify-center h-[70vh]">
        <SignIn />
      </div>
    </PageWrapper>
  );
}

export default BackofficeSignInPage;
