import React from "react";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "../breadcrumb/breadcrmb";

type Props = {
  title: string;
  className?: string;
  breadcrumb: { title?: string; path: string }[];
  disableTitle?: boolean;
};

function PageHeader({ title, className, breadcrumb, disableTitle }: Props) {
  return (
    <div className={cn("mt-24 mb-12", className)}>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <h1
        className={
          disableTitle
            ? "hidden"
            : "flex justify-center items-center uppercase font-bold  text-3xl mt-6"
        }
      >
        {title}
      </h1>
    </div>
  );
}

export default PageHeader;
