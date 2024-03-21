"use client";
import { Breadcrumbs } from "@/components/breadcrumb/breadcrmb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  breadcrumb: { title?: string; path: string }[];
  className?: string;
  title: string;
  extra?: React.ReactNode;
};

function PageHeader({ breadcrumb, className, title, extra }: Props) {
  return (
    <div className={cn(className)}>
      <Breadcrumbs backoffice breadcrumb={breadcrumb} />
      <div className="flex justify-between ">
        <h1 className="text-3xl font-bold uppercase">{title}</h1>
        <div className="flex space-x-2">{extra}</div>
      </div>
    </div>
  );
}

export default PageHeader;
