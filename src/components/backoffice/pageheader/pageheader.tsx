"use client";
import { Breadcrumbs } from "@/components/breadcrumb/breadcrmb";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  breadcrumb: { title?: string; path: string }[];
  className?: string;
  title: string;
};

function PageHeader({ breadcrumb, className, title }: Props) {
  return (
    <div className={cn(className)}>
      <Breadcrumbs backoffice breadcrumb={breadcrumb} />
      <h1 className="text-3xl font-bold uppercase">{title}</h1>
    </div>
  );
}

export default PageHeader;
